# frozen_string_literal: true

require 'bundler/gem_tasks'
require 'rake/testtask'

Rake::TestTask.new do |t|
  t.libs << 'test'
  t.test_files = FileList['test/**/*_test.rb'].pathmap { |f| File.expand_path(f, __FILE__) }
  t.loader = :rake
  t.verbose = false
  t.warning = false
end

# task :test do
#   ruby "test/jekyll_test.rb"
#   ruby "test/rails_test.rb"
# end
