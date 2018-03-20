# frozen_string_literal: true

ENV['RAILS_ENV'] = ENV['RACK_ENV'] = 'test'

require_relative 'dummy_rails/config/environment'
require 'rails/test_help'
require 'capybara/rails'
require_relative 'test_helper'
require 'selenium/webdriver' # Not compatible with Phantom JS

Dir['test/support/**/*.rb'].each do |file|
  # strip ^test/ and .rb$
  file = file[5..-4]
  require_relative File.join('.', file)
end

GEM_PATH = File.expand_path('../', File.dirname(__FILE__))

Capybara.register_driver :headless_chrome do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
    chromeOptions: { args: %w[headless disable-gpu no-sandbox] },
    loggingPrefs: { browser: 'ALL', client: 'ALL',
                    driver: 'ALL', server: 'ALL' }
  )

  Capybara::Selenium::Driver.new app,
                                 browser: :chrome,
                                 desired_capabilities: capabilities
end

Capybara.javascript_driver = :headless_chrome

# Capybara.register_driver :firefox_headless do |app|
#   options = ::Selenium::WebDriver::Firefox::Options.new
#   options.args << '--headless'
#   options.args << '--marionette'

#   Capybara::Selenium::Driver.new(app,
#                                  browser: :firefox,
#                                  marionette: true,
#                                  options: options)
# end
# Selenium::WebDriver::Firefox::Binary.path =
#   '/Applications/FirefoxDeveloperEdition.app/Contents/MacOS/firefox'
# Capybara.javascript_driver = :firefox_headless

Capybara.configure do |config|
  config.app_host              = 'http://localhost:7000'
  config.default_driver        = :headless_chrome
  config.javascript_driver     = :headless_chrome
  config.server_port           = 7000
  config.default_max_wait_time = 10
end

# Capybara.configure do |config|
#   config.app_host              = 'http://localhost:7000'
#   config.default_driver        = :firefox_headless
#   config.javascript_driver     = :firefox_headless
#   config.server_port           = 7000
#   config.default_max_wait_time = 10
# end

def suppress_output
  original_stdout = $stdout.clone
  original_stderr = $stderr.clone
  $stderr.reopen File.new('/dev/null', 'w')
  $stdout.reopen File.new('/dev/null', 'w')
  yield
ensure
  $stdout.reopen original_stdout
  $stderr.reopen original_stderr
end
