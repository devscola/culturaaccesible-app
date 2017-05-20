require 'capybara'
require 'capybara/rspec'
require 'selenium-webdriver'
require 'resolv-replace'
require_relative '../environment_configuration'

IONIC_PORT = retrieve_port

def host_ip
  routes = `/sbin/ip route`
  routes.match(/[\d\.]+/)
end

def use_selenium
  Capybara.register_driver :chrome do |app|
    Capybara::Selenium::Driver.new(app, {
      browser: :remote,
      url: 'http://chrome-cuac-container:4444/wd/hub',
      desired_capabilities: Selenium::WebDriver::Remote::Capabilities.chrome
    })
  end
  Capybara.default_driver = :chrome
  Capybara.app_host = "http://#{host_ip}:#{IONIC_PORT}"
end

def use_chrome
  Capybara.register_driver :chrome do |app|
    Capybara::Selenium::Driver.new(app, :browser => :chrome)
  end
  Capybara.default_driver = :chrome
  Capybara.app_host = "http://localhost:#{IONIC_PORT}"
end

mode = retrieve_mode

if (mode == 'development')
  use_selenium
else
  use_chrome
end
