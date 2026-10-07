---
layout: post
title: "Migrating from Paperclip to ActiveStorage without downtime"
headline: "Migrating from Paperclip to ActiveStorage without downtime"
description: "How we moved a production Rails app with a large S3 media library from Paperclip to ActiveStorage using dual writes, a backfill, staged cutovers, and compatibility monkey patches."
tags: [rails, activestorage, paperclip, aws, s3]
comments: true
share: true
toc: true
featured_post: true
image_svg: paperclip-activestorage-migration.svg
social_image: paperclip-activestorage-migration-social.png
social_image_width: 1200
social_image_height: 630
---

Paperclip had served a Rails application for years. It also made upgrading the application harder: the gem was deprecated, and keeping it working alongside newer Rails versions was becoming a maintenance risk.

The application had gigabytes of user media in S3. The files were part of the product: users uploaded them, clients requested their URLs, and image variants were used throughout the app. We could not just replace a gem and hope every attachment still worked.

Instead, we moved the storage layer in stages. Paperclip stayed available while ActiveStorage was introduced, old files were copied in the background, and models were switched over incrementally. The application kept serving production traffic throughout the rollout.

## Why replace Paperclip?

The goal was to remove an aging dependency that was becoming an obstacle to maintaining and upgrading Rails. Supported Ruby and Rails versions are also important for receiving security fixes. Newer runtimes can bring performance improvements, but we did not treat performance as a measured result of this migration.

ActiveStorage was already available in the application, so the task was to move attachment behavior and data without a big-bang cutover. We also had to preserve the URLs and variant behavior that the rest of the app expected.

## The rollout, in order

### 1. Configure the destination storage

We prepared the ActiveStorage S3 destination and configured the app to use it. The existing Paperclip path continued to serve the current production files while we tested ActiveStorage uploads and URL generation.

Some existing S3 objects also needed to move to a new bucket or key layout. Those were handled as storage operations, separately from web requests. The database metadata had to agree with the destination object key; copying bytes alone would not make an ActiveStorage attachment point to the new object.

### 2. Dual-write new uploads

Before copying the historical library, we made new uploads create both the existing Paperclip attachment and its ActiveStorage counterpart. That narrowed the window in which the two systems could diverge.

The temporary compatibility layer called Paperclip for the existing model API, then created the ActiveStorage blob and attachment after the record saved. The important property was ordering: the record had to exist before the polymorphic ActiveStorage attachment could be created.

### 3. Backfill existing attachments

The backfill task discovered Paperclip-backed models and attachments, selected records that still had a Paperclip filename but no ActiveStorage attachment, and processed them in batches with `find_each`.

For each record, it copied the original Paperclip file to a tempfile and assigned that file to ActiveStorage. A later run skipped records that already had an attachment, which made it practical to resume the task after individual failures.

The selection logic looked like this:

```ruby
records = model_class
  .left_outer_joins(:profile_attachment)
  .where(active_storage_attachments: { id: nil })
  .where.not(profile_file_name: nil)

records.find_each do |record|
  backfill_attachment_for(record, :profile)
end
```

In the task, the association and Paperclip column names were built from the attachment name, so the same approach could cover multiple models. The copy used the original file rather than assuming the Paperclip-generated styles already existed in ActiveStorage.

### 4. Preserve the attachment API and public URLs

ActiveStorage's API is not identical to Paperclip's. Our models used named styles such as `:thumb` and `:medium`, and callers expected to ask an attachment for a URL using the style name. We added a small concern for `has_one_attached` configuration, then patched `ActiveStorage::Attached::One` to translate those calls.

This excerpt shows the main shape of the URL and style adapter:

```ruby
class ActiveStorage::Attached::One
  def url(style = nil)
    return record.public_send("#{name}_default_url") unless attached?
    return url_for_attachment(self) if style.nil?

    url_for_attachment(variant(style))
  rescue ActiveStorage::InvariableError
    url_for_attachment(self)
  end

  def variant(style)
    return super(style) if style.is_a?(Hash)
    return self unless attached?

    styles = record.class.send("#{name}_attachment_config").dig(:styles, style)
    return self if styles.blank?

    super(styles)
  rescue ActiveStorage::InvariableError
    self
  end

  def url_for_attachment(blob)
    case Rails.application.config.active_storage.service
    when :local
      Rails.application.routes.url_helpers.url_for(blob)
    when :amazon
      escaped_key = blob.key.gsub(/[^a-zA-Z0-9\-_.~\/]/) do |character|
        URI.encode_www_form_component(character)
      end

      "https://#{ENV['CLOUD_FRONT_HOST']}/#{escaped_key}"
    end
  end
end
```

For S3, the app returned a direct CloudFront URL instead of routing every public file request through an ActiveStorage redirect. The key retained the filename, making the path readable. That is useful for people inspecting URLs, but it is not evidence of an SEO ranking benefit.

### 5. Generate stable, descriptive object keys

ActiveStorage's default keys are intentionally opaque. We needed keys that fit the application's S3 layout and included the original filename. We patched the attachment change object where a new blob is saved:

```ruby
module ActiveStorage
  class Attached::Changes::CreateOne
    def save
      blob.assign_attributes(
        key: generate_custom_key(attachment, blob),
        record: record,
        name: name
      )

      record.public_send("#{name}_attachment=", attachment)
      record.public_send("#{name}_blob=", blob)
    end

    private

    def generate_custom_key(attachment, blob)
      "#{attachment.record_type.underscore}/#{attachment.name}/" \
        "#{SecureRandom.uuid}/#{blob.filename}"
    end
  end
end
```

The UUID gives each upload a distinct object path. Replacing a file therefore produces a new URL path that can be cached independently. **We did not add a timestamp parameter to the ActiveStorage URL.** The UUID, not a timestamp, is the cache-busting part of this design.

Variants needed compatible keys too. We placed the variant under the original blob's directory and used a digest of the transformations:

```ruby
class ActiveStorage::Variant
  alias_method :original_key, :key

  def key
    return original_key unless blob.key.include?(blob.filename.to_s)

    parts = blob.key.split("/")
    filename = parts.pop
    digest = OpenSSL::Digest::SHA256.hexdigest(variation.key)

    "#{parts.join('/')}/variants/#{digest}/#{filename}"
  end
end

class ActiveStorage::Variation
  def key
    self.class.encode(transformations.except(:format))
  end
end
```

Ignoring the output format in the transformation key let equivalent transformations share the same variation identity. As with any patch to Rails internals, this code needed tests against the Rails version in use and a review during each Rails upgrade.

We also extended `ActiveStorage::Blob` with the attachment context needed to generate configured variants after creation, and copied the filename into the app's content-label field. Variant generation retried a few transient missing-object errors. Blob deletion removed the original object and, for images, its stored variants:

```ruby
ActiveStorage::Blob.class_eval do
  attr_accessor :record, :name

  before_create { self.content_label = filename }
  after_commit :process_variants, on: :create, if: :name

  def delete
    service.delete(key)
    return unless image?

    service.delete_prefixed("#{File.dirname(key)}/variants/")
  end
end
```

For multiple attachments, `ActiveStorage::Attached::Many#files_info` was also adapted to keep returning filename, blob ID, content label, and a public URL with the CDN hostname. That kept API consumers from needing to know which storage service produced the file.

### 6. Switch models, then remove Paperclip

Once the backfill was underway and the compatibility behavior had been exercised, we moved models from Paperclip declarations to native ActiveStorage associations one at a time. The shared concern kept style and default-URL configuration close to each attachment declaration.

Only after the model cutovers did we remove the Paperclip gem and references, then drop its filename, content type, file size, and updated-at columns. The Rails and Ruby upgrades came afterward. Removing Paperclip cleared a compatibility obstacle; it was not itself the Rails upgrade.

## Operational cleanup mattered too

The application code was only one part of the job. Some existing S3 keys had to be reconciled with the new blob metadata, and targeted object moves were performed outside request handling. One documented pass rekeyed 2,488 `Store::Sample` records in about ten minutes. That is a result for that subset, not a timing estimate for the entire media library.

We also audited for ActiveStorage blobs without attachments. A blob can appear temporarily orphaned while an asynchronous purge job is waiting to delete it, so a single count is not enough to distinguish normal cleanup from a real migration problem. We watched the purge activity, checked the remaining files, and removed the leftovers.

## What I would keep

- Start dual-writing before the bulk copy, so uploads during the migration are not missed.
- Make the backfill repeatable and select only records that still need work.
- Keep old and new storage available until reads, writes, variants, and URLs have been checked.
- Move models in small groups, then remove the old gem and columns as a separate cleanup step.
- Treat patches to ActiveStorage internals as version-specific code. Cover them with tests and revisit them during framework upgrades.
- Measure performance separately. A framework upgrade may improve performance, but a storage migration is not a benchmark.

ActiveStorage supports attaching files to ActiveRecord models and storing them on services such as Amazon S3. Its [official guide](https://guides.rubyonrails.org/active_storage_overview.html) is a useful reference for the standard behavior. In our case, the least risky route was to preserve the existing contract temporarily, migrate the data incrementally, and remove the compatibility layer only when the application no longer depended on Paperclip.
