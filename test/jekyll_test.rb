# frozen_string_literal: true

require 'fileutils'
require 'minitest/autorun'
require 'minitest/spec'
require 'json'

require 'jekyll'
require 'bourbon'
require_relative 'test_helper'
require 'pry'

# rubocop:disable Metrics/BlockLength
describe 'DummyJekyllTest' do
  BEFOREALL = begin
    test_path = File.expand_path('../', __FILE__)
    if Dir.exist? File.join(test_path, 'dummy_jekyll/_site')
      puts 'Removing previous _site folder.'
      FileUtils.rm_rf(File.join(test_path, 'dummy_jekyll/_site'),
                      secure: true, verbose: true)
    end
    if Dir.exist? File.join(test_path, 'dummy_jekyll/delete')
      puts 'Removing previous _delete folder'
      FileUtils.rm_rf File.join(test_path, 'dummy_jekyll/delete')
    end
    Dir.mkdir(File.join(test_path, 'dummy_jekyll/delete'))
    # Jekyll build must not be called in with bundle unless in Gemfile.
    FileUtils.cd("#{test_path}/dummy_jekyll") do
      unless system('bundle', 'exec', 'jekyll', 'build', '--quiet', '--trace')
        puts 'Something went wrong unable to jekyll build'
      end
    end
  end

  before do
    @test_path = File.expand_path('../', __FILE__)
    @gem_path = File.expand_path('../../', __FILE__)
  end

  it 'checks build completes' do
    FileUtils.touch File.join(@test_path, 'dummy_jekyll/delete/test1')
    assert Dir.exist?(File.join(@test_path, 'dummy_jekyll/_site'))
  end

  it 'checks main.scss compiled' do
    FileUtils.touch File.join(@test_path, 'dummy_jekyll/delete/test2')
    assert File.exist?(File.join(@test_path, 'dummy_jekyll/_site/assets/dummy.css'))
  end

  it 'checks jekyll assets manifest against gem files' do
    FileUtils.touch File.join(@test_path, 'dummy_jekyll/delete/test3')

    def get_json_manifest(path)
      json_file = JSON.parse(File.read(path))
      json_file['files'].compact.map do |filename|
        File.basename filename
      end
    end

    def compare_files(gem_assets, build_assets)
      return false if gem_assets.empty?
      return false if build_assets.empty?
      build_assets.uniq.sort == gem_assets.uniq.sort
    end

    gem_assets_paths = [File.join(@gem_path, 'app/assets'), File.join(@gem_path, 'vendor/assets')]
    build_assets_path = File.join(@test_path, 'dummy_jekyll/_site/')
    gem_assets = gem_assets_paths.collect do |gem_asset_path|
      Dir.glob("#{gem_asset_path}/**/*")
         .select { |f| File.file? f }
         .map { |f| File.basename f }
    end.flatten
    # The list.json is a special file that uses liquid tags to produce a manifest of files
    build_assets = get_json_manifest(File.join(build_assets_path, 'list.json'))
    assert compare_files(gem_assets, build_assets)
  end

  after do
    if File.exist?(File.join(@test_path, 'dummy_jekyll/delete/test1')) &&
       File.exist?(File.join(@test_path, 'dummy_jekyll/delete/test2')) &&
       File.exist?(File.join(@test_path, 'dummy_jekyll/delete/test3'))
      FileUtils.rm_rf(File.join(@test_path, 'dummy_jekyll/assets/bourbon'),
                      secure: true)
      FileUtils.rm_rf(File.join(@test_path, 'dummy_jekyll/_site'),
                      secure: true)
      FileUtils.rm_rf(File.join(@test_path, 'dummy_jekyll/delete'),
                      secure: true)
    end
  end
end
# rubocop:enable Metrics/BlockLength
