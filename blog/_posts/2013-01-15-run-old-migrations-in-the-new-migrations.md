---
layout: post
title: "Run old migrations in new migrations"
description: "This post describes how to use old migrations in new ones when you need code you have already written in earlier migrations."
tags: [rails, active_record, migrations]
share: true
comments: true
redirect_from:
  - /blog/2013/01/15/run-old-migrations-in-the-new-migrations/
---


Imagine you have to write a new migration with a lot of code that you have already written in an older migration. The required code is exactly the up/down/change part of that migration. In other words, you would like to run a migration part (up, down or change) in the new migration. Pay attention — you would have to write or copy and paste a lot of code. You have 2 ways to overcome this issue:

1. The simplest and most boring solution is to copy and paste this code or write it from scratch. This is not our choice. Old code and new code will mix, and you will have a huge amount of disgusting code — you won't be able to tell which code is new and which is old.
2. Use the older migration in a DRY way. Just use that code as you use another class, for instance the `User` model you probably have.

## Input data

In one project, I had to roll back my old migration, which had a lot of code. Check it out:

> db/migrate/20121107173946_add_search_content_to_products.rb

{% highlight ruby %}
class AddSearchContentToProducts < ActiveRecord::Migration
  def up
    add_column :products, :tsvector_content_tsearch, :tsvector
    add_column :products, :tsvector_content_dmetaphone, :tsvector

    execute <<-EOS
      CREATE INDEX products_tsvector_content_tsearch_idx ON products USING gin(tsvector_content_tsearch);
      CREATE INDEX products_tsvector_content_dmetaphone_idx ON products USING gin(tsvector_content_dmetaphone);
    EOS

    execute <<-EOS
      CREATE OR REPLACE FUNCTION get_tsvector(c text, w "char", lang regconfig DEFAULT 'pg_catalog.russian') RETURNS tsvector LANGUAGE plpgsql AS $$
      begin
        return setweight(to_tsvector(lang, coalesce(c, '')), w);
      end
      $$;
    EOS

    execute <<-EOS
      CREATE OR REPLACE FUNCTION products_trigger() RETURNS trigger LANGUAGE plpgsql AS $$
      declare
        product_model record;
        product_part record;
        product_brand record;
        product_seller record;

      begin
        select name, aliases, brand_id into product_model from models where id = new.model_id;
        select name, aliases into product_brand from brands where id = product_model.brand_id;
        select name, aliases into product_part from parts where id = new.part_id;
        select email, name into product_seller from sellers where id = new.seller_id;

        new.tsvector_content_tsearch :=
          get_tsvector(new.note, 'C') ||

          get_tsvector(product_model.name, 'A') ||
          get_tsvector(product_model.aliases, 'A') ||

          get_tsvector(product_part.name, 'A') ||
          get_tsvector(product_part.aliases, 'A') ||

          get_tsvector(product_brand.name, 'A') ||
          get_tsvector(product_brand.aliases, 'A') ||

          get_tsvector(product_seller.name, 'D') ||
          get_tsvector(product_seller.email, 'D');

        new.tsvector_content_dmetaphone :=
          get_tsvector(new.note, 'C', 'simple') ||

          get_tsvector(product_model.name, 'A', 'simple') ||
          get_tsvector(product_model.aliases, 'A', 'simple') ||

          get_tsvector(product_part.name, 'A', 'simple') ||
          get_tsvector(product_part.aliases, 'A', 'simple') ||

          get_tsvector(product_brand.name, 'A', 'simple') ||
          get_tsvector(product_brand.aliases, 'A', 'simple') ||

          get_tsvector(product_seller.name, 'D', 'simple') ||
          get_tsvector(product_seller.email, 'D', 'simple');

        return new;
      end
      $$;
    EOS

    execute <<-EOS
      CREATE TRIGGER products_content_to_search_trigger BEFORE INSERT OR UPDATE
        ON products FOR EACH ROW EXECUTE PROCEDURE products_trigger();
    EOS

    Product.all.each(&:touch)
  end

  def down
    remove_column :products, :tsvector_content_tsearch
    remove_column :products, :tsvector_content_dmetaphone

    execute <<-EOS
      DROP TRIGGER products_content_to_search_trigger ON products;
      DROP FUNCTION products_trigger();
      DROP FUNCTION get_tsvector(c text, w "char", lang regconfig);
    EOS
  end
end

{% endhighlight %}

As I have already said, I would like to roll it back in the up part of my new migration.
Writing a new migration and pasting this code there is not the right solution. I think you agree with me.

## Solution

I think the best solution is to include this migration in my new one, then use its class as usual code (yes — a migration is a class too, and we can do this). So here is the final code:

{% highlight ruby %}
require File.join(Rails.root, 'db/migrate/20121107173946_add_search_content_to_products.rb') # (1)

class ChangeSearchFunctions < ActiveRecord::Migration
  def up
    AddSearchContentToProducts.new.down # (2)

    add_column :products, :search_vector, :tsvector

    execute <<-EOS
      CREATE INDEX products_search_vector_idx ON products USING gin(search_vector);

      CREATE FUNCTION get_tsvector(c text, lang regconfig DEFAULT 'russian'::regconfig) RETURNS tsvector
      LANGUAGE plpgsql
      AS $$
        begin
          return to_tsvector(lang, coalesce(c, ''));
        end
        $$;

      CREATE FUNCTION products_trigger() RETURNS trigger
      LANGUAGE plpgsql
      AS $$
        declare
          product_model record;
          product_part record;
          product_brand record;
          product_seller record;

        begin
          select name, aliases, brand_id into product_model from models where id = new.model_id;
          select name, aliases into product_brand from brands where id = product_model.brand_id;
          select name, aliases into product_part from parts where id = new.part_id;
          select email, name into product_seller from sellers where id = new.seller_id;

          new.search_vector :=
            get_tsvector(new.note) ||

            get_tsvector(product_model.name) ||
            get_tsvector(product_model.aliases) ||

            get_tsvector(product_part.name) ||
            get_tsvector(product_part.aliases) ||

            get_tsvector(product_brand.name) ||
            get_tsvector(product_brand.aliases) ||

            get_tsvector(product_seller.name) ||
            get_tsvector(product_seller.email);

          return new;
        end
        $$;

      CREATE TRIGGER products_content_to_search_trigger BEFORE INSERT OR UPDATE
        ON products FOR EACH ROW EXECUTE PROCEDURE products_trigger();
    EOS
    Product.find_each(&:touch)
  end

  def down
    remove_column :products, :search_vector

    execute <<-EOS
      DROP TRIGGER products_content_to_search_trigger ON products;
      DROP FUNCTION products_trigger();
      DROP FUNCTION get_tsvector(c text, lang regconfig);
    EOS

    AddSearchContentToProducts.new.up # (3)
    Product.find_each(&:touch)
  end
end
{% endhighlight %}

See the first line (1): `require File.join(Rails.root, 'db/migrate/20121107173946_add_search_content_to_products.rb')`. With this line, I include the migration file, and after this we can use the old migration's class. On the fifth line (2), I use it: `AddSearchContentToProducts.new.down` to roll back the old migration. In down, I have to run that migration's up method; see mark (3): `AddSearchContentToProducts.new.up`.

In this example, I had to rewrite a stored procedure for a PostgreSQL database, and I've got a clean, DRY solution, as you can see. Imagine how much code I would have if I pasted the entire migration into the new one! I hope you will find this article useful, and if you have issues like mine, you won't have problems solving them now.

UPDATE 26.06.2013: In Rails 4, a new method appeared that allows you to revert all migrations. Check it out:

```ruby
require_relative '2012121212_example_migration'

class FixupExampleMigration < ActiveRecord::Migration
  def change
    revert ExampleMigration

    create_table(:apples) do |t|
      t.string :variety
    end
  end
end
```
