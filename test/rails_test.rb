# frozen_string_literal: true

require_relative 'test_helper_rails'
require 'json'
require 'pry'

class RailsTest < ActionDispatch::IntegrationTest
  include ::DummyRailsIntegration
  def test_js_loaded
    ## Verifies JavaScript loaded.
    visit root_path

    assert_silent do
      execute_script 'certifyDesignSystem === true;'
      # ^ throws error if JS not loaded.
    end
  end

  def test_colors_on_screenshot
    ## Verifies colors load: CSS, Image and Svg. Fonts untested.
    visit root_path
    screenshot!

    assert screenshot_contains_right_colors
  end

  def test_fonts_screenshot
    ## Verifies fonts loaded. 
    visit '/fonts'
    screenshot!

    assert screenshot_contains_no_black
  end

  def test_autoprefixer
    ## Checks that Browser Prefixes are added.
    suppress_output do
      get ActionController::Base.helpers.stylesheet_path('application.css')
    end
    assert_match(/-webkit-(?:transition|transform)/, response.body)
  end

  def test_precompile
    ## Verifies Precompile Works, suppresses verbose output.
    Dummy::Application.load_tasks
    suppress_output do
      Rake::Task['assets:precompile'].invoke
    end
  end

  # rubocop:disable Metrics/AbcSize
  def test_json_asset_manifest
    ## Verifies that Assets are Listed on the Manifest loaded to Rails.
    visit '/list.text'
    json_list = JSON.parse(page.text)
    gem_path = File.expand_path('../../', __FILE__)
    gem_assets_paths = [File.join(gem_path, 'app/assets'), File.join(gem_path, 'vendor/assets')]
    gem_assets = gem_assets_paths.collect do |gem_asset_path|
      Dir.glob("#{gem_asset_path}/**/*").select { |f| File.file? f }.map { |f| File.basename f }
    end.flatten
    intersec = gem_assets & json_list
    intersec.uniq.sort == gem_assets.uniq.sort
  end
  # rubocop:enable Metrics/AbcSize
end
