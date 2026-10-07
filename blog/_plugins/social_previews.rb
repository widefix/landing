require 'digest'
require 'fileutils'
require 'vips'

# Social crawlers need raster images. Use the article's hero artwork, preserving
# the whole composition in a standard 1200 x 630 preview.
module WideFix
  class SocialPreviews < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      site.config['widefix_social_previews'] = {}
      (site.posts.docs + site.pages).each do |document|
        next if document.data['layout'].nil?

        original = [document.data['social_image'], document.data['image_svg'], document.data['image']]
          .find { |value| value.is_a?(String) && !value.empty? }
        next if original && original.match?(%r{\Ahttps?://})

        original ||= 'post.jpg'
        source = File.expand_path(original, File.join(site.source, 'images'))
        source = File.join(site.source, 'images', 'post.jpg') unless File.file?(source)
        name = "#{File.basename(source, '.*')}-#{Digest::SHA256.hexdigest(source.sub(site.source, ''))[0, 12]}.jpg"
        relative = "social/#{name}"
        site.config['widefix_social_previews'][relative] = source
        document.data['social_image'] = relative
        document.data['social_image_width'] = 1200
        document.data['social_image_height'] = 630
      end
    end
  end
end

Jekyll::Hooks.register :site, :post_write do |site|
  previews = site.config['widefix_social_previews'] || {}
  FileUtils.mkdir_p(File.join(site.dest, 'images', 'social'))
  previews.each do |relative, source|
    image = Vips::Image.thumbnail(source, 1104, height: 534, size: :both).colourspace(:srgb)
    image = image.flatten(background: [241, 245, 249]) if image.has_alpha?
    canvas = Vips::Image.black(1200, 630, bands: 3).new_from_image([241, 245, 249])
    canvas.insert(image, (1200 - image.width) / 2, (630 - image.height) / 2)
      .write_to_file(File.join(site.dest, 'images', relative), Q: 90, strip: true)
  end
end
