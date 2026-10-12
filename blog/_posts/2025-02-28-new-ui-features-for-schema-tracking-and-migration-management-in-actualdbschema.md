---
layout: post
title: "New UI Features for Schema Tracking and Migration Management in ActualDbSchema "
headline: "New UI Features for Schema Tracking and Migration Management in ActualDbSchema "
modified: 2025-02-28 14:28:19 +0400
description: "Some description goes here."
tags: [actual_db_schema, rails, rails-development, migrations]
featured_post: false
toc: true
image: actual_db_schema-083.jpg
author:
    name: Mane Darbinyan
    github: m-darbinyan
    linkedin: mane-darbinyan
    twitter: ManeDarbinyan
---

Hello, Rails developers! We're thrilled to announce the release of ActualDbSchema v0.8.3! 🎉 This update brings new tools to visualize schema changes directly in your browser, clean up broken migrations, and customize your workflow. Let's explore what's new!

## View Schema with Migration Annotations in the UI

Ever wanted to inspect your schema and trace which migration introduced a specific change directly from the browser? Now you can!

Navigate to the migrations page (`http://localhost:3000/rails/migrations`) and click the **`View Schema`** button to see the schema diff rendered in the UI, annotated with the migrations that created each change. If there are no pending changes, the UI shows the entire schema.

**Key Features:**

- **Diff Highlighting**: See schema changes alongside their originating migrations.
- **Filtering**: Search for specific tables using a built-in filter.
- **Migration Links**: Click any annotation to jump to the corresponding migration details.

**Schema Page on the UI**
![Schema Page on the UI](/blog/images/schema_page.png)

**Schema Page with Filter**
![Schema Page with Filter](/blog/images/schema_page_with_filter.png)

## Clean Up Broken Migrations

Managing old migrations can be challenging, especially when migration files go missing. In this release, we’ve introduced a **Broken Versions** page and rake tasks to clean up these records.

**What Are Broken Migrations?**

A migration is considered **broken** if it exists in the database but the corresponding file is missing. This can happen if migrations were deleted manually after being applied.

**How to Delete Broken Migrations?**

1️⃣ **Using the UI**

Navigate to the following URL in your web browser to see all broken migrations:

```
http://localhost:3000/rails/broken_versions
```

You can delete them **individually** or use the **Delete All** button to clean up everything at once.

![Broken versions page](/blog/images/broken_versions_page.png)

2️⃣ **Using a Rake Task**

Run the following command to remove all broken migrations:

```shell
rake actual_db_schema:delete_broken_versions
```

To delete specific migrations, specify their versions:

```shell
rake actual_db_schema:delete_broken_versions["20250224103352 20250224103358"]
```

For multi-database applications, you can also specify the database:

```shell
rake actual_db_schema:delete_broken_versions["20250224103352 20250224103358", "primary"]
```

## Filter Migrations in the UI

Tired of scrolling through hundreds of migrations? We've added a search bar to the migrations page, making it easy to find migrations by **name** or **content**. Whether you're tracking down a specific change or reviewing past updates, finding what you need is now faster and more intuitive.

![Migrations page with filter](/blog/images/migrations_page_with_filter.png)

## Customize Your Migrated Folder Location

By default, ActualDbSchema stores migration records in `tmp/migrated`. Now you can customize this path to match your project structure:

1️⃣ **Using an Environment Variable**

Set the environment variable `ACTUAL_DB_SCHEMA_MIGRATED_FOLDER` to your desired folder path:

```shell
export ACTUAL_DB_SCHEMA_MIGRATED_FOLDER="custom/migrated"
```

2️⃣ **Using an Initializer**

Add the following line to your initializer file (`config/initializers/actual_db_schema.rb`):

```ruby
config.migrated_folder = Rails.root.join("custom", "migrated")
```

## Conclusion

With ActualDbSchema v0.8.3, managing your database schema is easier than ever. From visualizing schema changes to cleaning up broken migrations and filtering migrations more efficiently, this release provides new tools for your Rails projects.

We hope these enhancements improve your development workflow. Give them a try in your next project and let us know what you think!

Happy coding, and stay tuned for more updates! 🌟
