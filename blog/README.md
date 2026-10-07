# WideFix engineering blog

Jekyll sources for https://widefix.com/blog. Article URLs and Markdown posts are preserved across the design refresh.

## Development

Install the gems with `bundle install`, then run `bundle exec jekyll serve` from this directory. Build with `JEKYLL_ENV=production bundle exec jekyll build`. The deployment workflow copies `_site` into the main site's `out/blog` directory.

For a local preview, add a local config file with `url: http://localhost:4000` and pass `--config _config.yml,/path/to/local-config.yml` to Jekyll. Keep that override out of production builds.

## Design

The active theme uses `_layouts`, `_includes`, `assets/css/modern.css`, and `assets/js/blog.js`. CSS and JavaScript are served directly; no Grunt build is needed for the current theme. The legacy LESS files and compiled assets remain available for reference.

The homepage features selected articles and recent posts. Article pages include author details, reading time, syntax-highlighted code, and related posts. Search uses the generated `search.json` index and supports titles, descriptions, and tags.

Edit `about-author.md` to update Andrei's profile. Use `rake featured_post` to change the featured article.
