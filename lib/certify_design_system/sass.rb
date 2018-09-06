# frozen_string_literal: true

require 'sass'

## Adds the sass directory to the Sass gem path for compiling.
## Used for Jekyll
# @note used for jekyll
module CertifyDesignSystem
  class << self
    # @note used for jekyll
    def gem_path
      @gem_path ||= File.expand_path '../../', File.dirname(__FILE__)
    end

    # @note used for jekyll
    def stylesheets_path
      File.join gem_path, 'app/assets/stylesheets'
    end

    # @note used for jekyll
    def javascripts_path
      File.join gem_path, 'app/assets/javascripts'
    end

    # @note used for jekyll
    def vendor_javascripts_path
      File.join gem_path, 'vendor/assets/javascripts'
    end

    # @note used for jekyll
    def fonts_path
      File.join gem_path, 'app/assets/fonts'
    end

    # @note used for jekyll
    def images_path
      File.join gem_path, 'app/assets/images'
    end

    # @note used for jekyll
    def svg_sprite_path
      File.join gem_path, 'app/assets/images/svg-sprite'
    end

    # @note used for jekyll
    def configure_sass
      ::Sass.load_paths << stylesheets_path
    end
  end
end
