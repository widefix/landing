# WideFix engineering blog

Jekyll sources for https://widefix.com/blog. Article URLs and Markdown posts are preserved across the design refresh.

## Development

Install the gems with `bundle install`, then run `bundle exec jekyll serve` from this directory. Build with `JEKYLL_ENV=production bundle exec jekyll build`. The deployment workflow copies `_site` into the main site's `out/blog` directory.

For a local preview, add a local config file with `url: http://localhost:4000` and pass `--config _config.yml,/path/to/local-config.yml` to Jekyll. Keep that override out of production builds.

## Design

The active theme uses `_layouts`, `_includes`, `assets/css/modern.css`, and `assets/js/blog.js`. CSS and JavaScript are served directly; no Grunt build is needed for the current theme. The legacy LESS files and compiled assets remain available for reference.

The homepage features selected articles and recent posts. Article pages include author details, reading time, syntax-highlighted code, and related posts. Search uses the generated `search.json` index and supports titles, descriptions, and tags.

Edit `about-author.md` to update Andrei's profile. Use `rake featured_post` to change the featured article.

## Social preview images

Open Graph and Twitter previews use the page's hero (`image_svg` or `image`), with `images/post.jpg` as the fallback for pages without a hero. Set `social_image` to a filename under `images/` when the hero needs a separate preview version, especially for SVG artwork. Use PNG or JPEG for that version and fit the full artwork into a 1200 × 630 frame. Optional `social_image_width` and `social_image_height` fields publish its dimensions. Article structured data uses the same preview image.

To regenerate the Paperclip article's preview:

```sh
rsvg-convert -w 1200 -h 400 images/paperclip-activestorage-migration.svg -o /tmp/widefix-paperclip-hero.png
magick /tmp/widefix-paperclip-hero.png -background '#173C32' -gravity center -extent 1200x630 images/paperclip-activestorage-migration-social.png
```
