# Certify Design System Gem
Certify Design System Gem
This gem supplies the Certify Design System Assets to either Jekyll or Rails applications.

### Table of Contents

- Installation
    - Requirements
    - Building
- Usage
- Additional Configuration
- Testing
- Changelog
- License
- Contributing
- Security Issues


## Installation

Add this line to your application's Gemfile:

For Development use the unpacked gem

```ruby
gem 'certify_design_system', path: "#{path_to_upacked_gem_files}"
```

And then execute:

```
$ bundle
```
### Requirements

This gem requires [Bourbon](https://github.com/thoughtbot/bourbon), [JQuery](https://jquery.com/) and [Sass](https://github.com/sass/sass).   
**note: The gem has hard dependencies on the bourbon and sass gems but __not__ the JQuery gem, as JQuery can be required through CDN instead.

For tests Jekyll, Capybara and Rails are dependencies. Test-only dependencies are listed on the Gemfile but absent from the `gemspec` since using it in rails doesn't require Jekyll be loaded and vice-versa. 

### Building

To build a gem run the rake build command:

```
$ bundle exec rake build
```

## Usage
### Rails

#### Javascript

add the `jquery-rails` gem to the Gemfile

```ruby
gem 'jquery-rails'
```

add the following to application.js on the Rails application (JQuery must be required above the gem)

```javascript 
//= require jquery
//= require cds	
```

#### Stylesheets

add the `sass-rails` gem to the Gemfile

```ruby
gem 'sass-rails'
```

add the following to `application.css.scss` on the Rails application

```sass
@import 'cds'; 
```

Because the bourbon version required is old the gem sets this variable:

```sass
$output-bourbon-deprecation-warnings: false !default;
```

#### Rails Asset Precompile

for images and fonts you may need to precompile:

run asset precompile
`$ bin/rails assets:precompile`

### Jekyll

Add gem to your `Gemfile` under jekyll_plugins.  This gem requires `jekyll-assets` and it must be loaded before in the Gemfile. 

```ruby
group :jekyll_plugins do
  gem 'jekyll-assets'
  gem 'certify_design_system'
end

```

Add this to your `_config.yml`:

```yaml
plugins:
  - jekyll-assets
  - bourbon
  
assets: 
  digest: false
  sources: 
    - app/assets/javascripts
    - app/assets/stylesheets
    - app/assets/fonts
    - app/assets/images
    - core
```

See the documentation on the jekyll-assets gem for more details.

Make sure to require JQuery before any of the javascript resources. 
You can use JQuery's [CDN](https://code.jquery.com/):

```html
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
```

Because the bourbon version required is old the gem sets this variable:

```sass
$output-bourbon-deprecation-warnings: false !default;
```

Use the jekyll-assets tags to load assets:
(The sass files can be individually loaded with the `@import` function into a file that is preprocessed, but the fonts may not work.)

```
{% asset cds.js %}
{% asset cds.scss %}
{% asset certify-sba-gov-logo_on-white.png %}
{% asset svg-sprite/sprite.svg %}
```

Additionally all the fonts need to me added individually:

```
{% asset sourcesanspro-regular-webfont.ttf %}
{% asset sourcesanspro-regular-webfont.woff %}
{% asset sourcesanspro-regular-webfont.woff2 %}
{% asset sourcesanspro-regular-webfont.eot %}

{% asset sourcesanspro-bold-webfont.ttf %}
{% asset sourcesanspro-bold-webfont.woff %}
{% asset sourcesanspro-bold-webfont.woff2 %}
{% asset sourcesanspro-bold-webfont.eot %}
```

## Additional Configuration

### Using Firefox headless instead of Chrome.

Firefox may provide a more consistent experience for testing accross environments as its screenshots are the same size regardless of retina display. 

Install the [geckodriver](https://github.com/mozilla/geckodriver/releases): 
`brew install geckodriver`

Make sure you don't have the gem: `geckodriver-helper` installed. If you have it installed you must uninstall it for Firefox to work. 

Add this to `test_helper_rails.rb` and remove Chrome sections: 

```ruby 
Capybara.register_driver :firefox_headless do |app|
  options = ::Selenium::WebDriver::Firefox::Options.new
  options.args << '--headless' 
  options.args << '--marionette'

  Capybara::Selenium::Driver.new(app, 
    browser: :firefox, 
    marionette: true,
    options: options)
end
Selenium::WebDriver::Firefox::Binary.path = "#{path_to_firefox_executable}"
Capybara.javascript_driver = :firefox_headless
```

The path to the firefox executable is different for every machine, for example: 
`"/Applications/FirefoxDeveloperEdition.app/Contents/MacOS/firefox"`.

Then switch Capybara's js driver: 

```ruby
Capybara.configure do |config|
  config.app_host              = 'http://localhost:7000'
  config.default_driver        = :firefox_headless
  config.javascript_driver     = :firefox_headless
  config.server_port           = 7000
  config.default_max_wait_time = 10
end
```

Note:
- The `test_json_asset_manifest` test may not work with _Firefox Developer Edition_ due to the way it renders JSON so use a text rendering for the JSON instead. Using text instead. 
- Setting the binary for Firefox is not ideal. 


#### Importing as Sass. 

If you wish to use  the variables in the scss, be aware that that if you import `cds.scss` from a scss file it will look for the fonts where ever that file sits.

For example:

`assets/stylesheets/my-theme.scss`:

```sass
@import "cds";

body {
  background: $color-gray;
}
````

Then the fonts search for in `assets/stylesheets` thus you'll have to load them manually there. 


## Testing

Run `bundle install` and `bundle exec rake test` to run all tests. 

## Changelog
This gem uses semantic versioning. Version is stored in `lib/certify_design_system/version.rb`.  
Please look at the [releases page](https://github.com/USSBA/certify_design_system_gem/releases) for information on the version releases.

## License 

Please look at [LICENSES.md](/LICENSES.md) for full License information.

## Contributing

Please look at [CONTRIBUTING.md](/CONTRIBUTING.md) for information on how to contribute.

We strive for a welcoming and inclusive environment for the HUBZone-WebMap project.

Please follow this guidelines in all interactions:

1. Be Respectful: use welcoming and inclusive language.
2. Assume best intentions: seek to understand other's opinions.

## Security Issues

Please do not submit an issue on GitHub for a security vulnerability. Please contact the development team through the Certify Help Desk at [help@certify.sba.gov](mailto:help@certify.sba.gov).

Be sure to include all the pertinent information.

<sub>The agency reserves the right to change this policy at any time.</sub>




