# frozen_string_literal: true

require 'capybara/dsl'
require 'fileutils'
require 'chunky_png'

module DummyRailsIntegration
  include Capybara::DSL

  def setup
    super
    cleanup_dummy_rails_files
  end

  def teardown
    super
    cleanup_dummy_rails_files
    Capybara.reset_sessions!
    Capybara.use_default_driver
  end

  # rubocop:disable Metrics/AbcSize
  def screenshot!
    ## Chromedriver and Geckodriver only:
    raise 'Unable To Take Screenshot' unless page.driver.respond_to? :save_screenshot
    path = "tmp/#{name}.png"
    FileUtils.mkdir 'tmp' unless Dir.exist? 'tmp'
    ## Chromedriver and Geckodriver will have different dimensions regarless of call below.
    page.driver.browser.manage.window.size = Selenium::WebDriver::Dimension.new(800, 600)
    page.driver.save_screenshot(File.join(GEM_PATH, path))
    STDERR.puts "Screenshot saved to #{path}"
  end
  # rubocop:enable Metrics/AbcSize

  def screenshot_contains_right_colors
    # Can test CSS, Image Loading, and SVG Sprite if colored uniquely. Doesn't test Fonts.
    screenshot = ChunkyPNG::Image.from_file "tmp/#{name}.png"
    screenshot.palette.include?(ChunkyPNG::Color.from_hex('#0071bc')) &&
      screenshot.palette.include?(ChunkyPNG::Color.from_hex('#e31c3d')) &&
      screenshot.palette.include?(ChunkyPNG::Color.from_hex('#02bfe7')) &&
      screenshot.palette.include?(ChunkyPNG::Color.from_hex('#fdb81e'))
  end

  # rubocop:disable Style/Not
  def screenshot_contains_no_black
    # Tests Fonts by overlaying a white font over a black font image.
    screenshot = ChunkyPNG::Image.from_file "tmp/#{name}.png"
    not screenshot.palette.include?(ChunkyPNG::Color.from_hex('#000000'))
  end
  # rubocop:enable Style/Not

  private

  def cleanup_dummy_rails_files
    FileUtils.rm_rf('test/dummy_rails/tmp/cache', secure: true)
    FileUtils.rm_rf('test/dummy_rails/public/assets', secure: true)
    FileUtils.mkdir_p('test/dummy_rails/public/assets')
  end
end
