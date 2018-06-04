
# frozen_string_literal: true

lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'certify_design_system/version'

Gem::Specification.new do |spec|
  spec.name          = 'certify_design_system'
  spec.version       = CertifyDesignSystem::VERSION
  spec.authors       = ['jaredcunha-usds', 'rebel-one']
  spec.email         = ['david_m_acevedo@omb.eop.gov', 'jared_c_cunha@omb.eop.gov']

  spec.summary       = 'asset delivery gem'
  spec.homepage      = "https://github.com/USSBA/certify_design_system_gem"
  spec.licenses      = ['MIT', 'OFL-1.1', 'CC-BY-4.0', 'CC0-1.0']

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(/^(assets|_layouts|_includes|_sass|LICENSE|README)/i) }

  spec.required_ruby_version = '>= 2.3.3'
  
  spec.executables   = ["cds-gh-pages"]  

  spec.add_runtime_dependency 'bourbon', '~> 4.3', '<= 5'
  spec.add_runtime_dependency 'sass', '~> 3.5'
  ## requires JQuery

  spec.add_development_dependency 'bundler', '~> 1.12'
  spec.add_development_dependency 'rake', '~> 10.0'

  spec.add_development_dependency 'minitest', '~> 5.10', '>= 5.10.3'
  spec.add_development_dependency 'pry', '~> 0.11.3'
  spec.add_development_dependency 'rubocop', '~> 0.52', '>= 0.52.1'
end
