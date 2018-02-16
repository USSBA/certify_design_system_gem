# frozen_string_literal: true

require 'sass'

## Adds the sass directory to the Sass gem path for compiling
## Used for Jekyll
module CertifyDesignSystem
  class << self
    def gem_path
      @gem_path ||= File.expand_path '../../', File.dirname(__FILE__)
    end

    def stylesheets_path
      File.join gem_path, 'app/assets/stylesheets'
    end

    def javascripts_path
      File.join gem_path, 'app/assets/javascripts'
    end

    def vendor_javascripts_path
      File.join gem_path, 'vendor/assets/javascripts'
    end

    def fonts_path
      File.join gem_path, 'app/assets/fonts'
    end

    def images_path
      File.join gem_path, 'app/assets/images'
    end

    def svg_sprite_path
      File.join gem_path, 'app/assets/images/svg-sprite'
    end

    def configure_sass
      ::Sass.load_paths << stylesheets_path
    end
  end
end
