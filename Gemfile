# frozen_string_literal: true

source 'https://rubygems.org'

## Requires Gem in gemspec.
gemspec

## Gems for use in Development.
gem 'pry', require: false, group: :development
gem 'rubocop', require: false, group: :development

## Integration testing
gem 'capybara', '>= 2.6.0', group: :test
gem 'minitest-reporters', '~> 1.0.5', group: :test
# gem 'poltergeist', group: :test
gem 'chromedriver-helper', group: :test
gem 'selenium-webdriver', '~> 3.12.0', group: :test 
gem 'capybara-selenium', group: :test 
gem 'chunky_png', group: :test

# Dummy Jekyll dependencies
group :test do
  gem 'jekyll', '3.7.0'
  gem 'jekyll-assets'
end

# Dummy Rails app dependencies
group :test do
  gem 'rake'
  gem 'puma'
  gem 'actionpack', '>= 4.1.5'
  gem 'activesupport', '>= 4.1.5'
  gem 'autoprefixer-rails'
  gem 'jquery-rails', '>= 3.1.0'
  gem 'json', '>= 1.8.1'
  gem 'rails', '>= 4.1.5'
  gem 'sprockets-rails', '>= 2.3.2'
  gem 'uglifier'
end
