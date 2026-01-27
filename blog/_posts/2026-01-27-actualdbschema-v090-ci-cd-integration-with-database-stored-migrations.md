---
layout: post
title: "ActualDbSchema v0.9.0: CI/CD Integration with Database-Stored Migrations"
headline: "ActualDbSchema v0.9.0: CI/CD Integration with Database-Stored Migrations"
modified: 2026-01-27 12:00:00 +0100
description: "Enhanced CI/CD integration and database-stored migrations for consistent schema management across all environments."
tags: [actual_db_schema, rails, rails-development, migrations]
featured_post: false
toc: true
image: watched-cloud.jpg
---

Welcome to 2026 with the new release of [ActualDbSchema v0.9.0](https://github.com/widefix/actual_db_schema)! 🎉 This update brings powerful enhancements to integrate seamlessly into your Continuous Integration and Continuous Deployment workflows.

## What's New in v0.9.0?

This release focuses on ensuring your database schema remains consistent and up-to-date across all environments. The key highlight is a **new adapter to store executed migrations in the database**.

Previously, ActualDbSchema tracked migrations locally using the `tmp` folder. While this worked great for local development, it limited the tool's usefulness in CI/CD pipelines and shared environments. With v0.9.0, you can now store migration tracking data directly in the database, making the tool helpful in **all your environments**, not just on your local machine.

## Why Does This Matter?

If you've been facing:

- **Frequent data structure conflicts** between team members
- **Schema file inconsistencies** across branches
- **CI/CD pipeline failures** due to migration mismatches
- **Difficulty tracking phantom migrations** in staging or production-like environments

This update is for you! By storing migration metadata in the database, ActualDbSchema can now:

1. **Track migrations consistently** across all environments
2. **Integrate with your CI/CD workflows** seamlessly
3. **Detect and handle phantom migrations** in shared development databases
4. **Maintain schema consistency** across your entire team

## Getting Started

### Installation

If you haven't installed ActualDbSchema yet, add it to your Gemfile:

```ruby
group :development do
  gem "actual_db_schema"
end
```

Then run:

```shell
bundle install
```

For full installation details, check the [official documentation](https://lnkd.in/d97MemJq).

### Enable Database-Stored Migrations

To take advantage of the new database adapter for storing migrations, follow the [configuration guide](https://lnkd.in/dPmmkWED).

This simple configuration change unlocks the full power of ActualDbSchema in your CI/CD pipelines and shared environments.

## Conclusion

ActualDbSchema v0.9.0 marks a significant step forward in making database schema management seamless across all your development and deployment environments. No more local-only tracking—now you can ensure consistency from development to production.

Upgrade today and experience a smoother, more reliable Rails development workflow!

[Your feedback and questions are always welcomed](https://github.com/widefix/actual_db_schema/discussions).
