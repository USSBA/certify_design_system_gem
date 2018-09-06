# frozen_string_literal: true

require 'certify_design_system/version'
require 'bourbon'
require 'certify_design_system/sass'

## Certify Delivery System Gem
# Creates Rails Engine or sets up assets for the Jekyll 'jekyll-assets' gem.
# @see https://ussba.github.io/certify-design-system-documentation/ Component Documentation
module CertifyDesignSystem
  if defined?(::Rails)

    ## Creates a Rails Engine
    # @note used only for rails.
    class Engine < ::Rails::Engine
      isolate_namespace CertifyDesignSystem

      initializer 'certify_design_system.assets.precompile' do |app|
        app.config.assets.precompile +=
          %w[*.png *.jpg *.jpeg *.gif *.eot *.svg *.ttf *.woff *.woff2]
      end
    end

  elsif defined?(::Jekyll) && defined?(::Sprockets)
    Sprockets.append_path(CertifyDesignSystem.stylesheets_path)
    Sprockets.append_path(CertifyDesignSystem.javascripts_path)
    Sprockets.append_path(CertifyDesignSystem.vendor_javascripts_path)
    Sprockets.append_path(CertifyDesignSystem.images_path)
    Sprockets.append_path(CertifyDesignSystem.svg_sprite_path)
    Sprockets.append_path(CertifyDesignSystem.fonts_path)
    CertifyDesignSystem.configure_sass
  end
end
