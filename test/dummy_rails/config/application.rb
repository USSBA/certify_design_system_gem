# frozen_string_literal: true

# # frozen_string_literal: true
#
# require_relative 'boot'
#
# require 'rails/all'
#
# Bundler.require(*Rails.groups)
# require 'cds'
#
# module Dummy
#   class Application < Rails::Application
#     # Initialize configuration defaults for originally generated Rails version.
#     config.load_defaults 5.1
#
#     # Settings in config/environments/* take precedence over those specified here.
#     # Application configuration should go into files in config/initializers
#     # -- all .rb files in that directory are automatically loaded.
#   end
# end

require File.expand_path('../boot', __FILE__)

require 'rails'

%w[
  action_controller
  action_view
  sprockets
].each do |framework|
  require "#{framework}/railtie"
end

require 'autoprefixer-rails'
require 'uglifier'
require 'jquery-rails'

require 'certify_design_system'

module Dummy
  class Application < Rails::Application
    config.assets.enabled = true if config.assets.respond_to?(:enabled)
    if Rails::VERSION::MAJOR > 4
      # Rails 4 precompiles application.css|js by default, but future version of Rails do not.
      config.assets.precompile += %w[application.css application.js]
    end
    config.to_prepare do
      if ENV['VERBOSE']
        STDERR.puts "Loaded Rails #{Rails::VERSION::STRING}, Sprockets #{Sprockets::VERSION}",
                    "Asset paths: #{Rails.application.config.assets.paths}"
      end
    end
  end
end
