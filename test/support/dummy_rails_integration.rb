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
    FileUtils.mkdir 'tmp' unless Dir.exist? 'tmp' # This may be the source of Jared's error.
    ## Chromedriver and Geckodirver will have different dimensions regarless of call below.
    page.driver.browser.manage.window.size = Selenium::WebDriver::Dimension.new(800, 600)
    page.driver.save_screenshot(File.join(GEM_PATH, path))
    STDERR.puts "Screenshot saved to #{path}"
  end
  # rubocop:enable Metrics/AbcSize

  ## To create the base image files used below:
  ## ------------------------------------------
  # Use Capybara to take a screen shot using method above.
  # Open that screenshot in an image manipulator like GnuImageManipulationProgram.
  # Invert the colors and set transparency/opacity to 50% of the layer.
  # Export image to png with the least compression possible, this is the reference inverted.
  # Use ChunkyPNG to import both images and overlaying them with compose.
  # Save the result as the gray reference image from ChunkyPNG.

  # rubocop:disable Metrics/AbcSize
  # This test is slow; reads three files.
  def screenshot_equals_test_screenshot
    raise "Doesn't work with this JS Driver." if page.driver.respond_to? :render
    ## Doesn't work with Phantom JS because of transparencies.
    screenshot = ChunkyPNG::Image.from_file "tmp/#{name}.png"
    width = screenshot.width
    height = screenshot.height
    dimensions = { chrome_retina: [1600, 1200], chrome: [800, 600], firefox: [800, 526] }
    raise 'Unable to Compare Screenshots' unless dimensions.values.include? [width, height]
    inverted_screenshot = ChunkyPNG::Image.from_file "test/img/inverted_#{width}x#{height}.png"
    grey = ChunkyPNG::Image.from_file "test/img/grey_#{width}x#{height}.png"
    grey == screenshot.compose(inverted_screenshot)
  end
  # rubocop:enable Metrics/AbcSize

  # This test reads one file.
  def screenshot_contains_right_colors
    # Can test CSS, Image Loading, and SVG Sprite if colored uniquely
    # Can't test Fonts.
    screenshot = ChunkyPNG::Image.from_file "tmp/#{name}.png"
    screenshot.palette.include?(ChunkyPNG::Color.from_hex('#0071bc')) &&
      screenshot.palette.include?(ChunkyPNG::Color.from_hex('#e31c3d')) &&
      screenshot.palette.include?(ChunkyPNG::Color.from_hex('#02bfe7')) &&
      screenshot.palette.include?(ChunkyPNG::Color.from_hex('#fdb81e'))
  end

  def screenshot_contains_no_black
    # Tests Fonts by overlaying a white font over a black font image.
    screenshot = ChunkyPNG::Image.from_file "tmp/#{name}.png"
    not screenshot.palette.include?(ChunkyPNG::Color.from_hex('#000000'))
  end


  private

  def cleanup_dummy_rails_files
    FileUtils.rm_rf('test/dummy_rails/tmp/cache', secure: true)
    FileUtils.rm_rf('test/dummy_rails/public/assets', secure: true)
    FileUtils.mkdir_p('test/dummy_rails/public/assets')
  end
end
