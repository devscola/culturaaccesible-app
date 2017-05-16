require 'spec_helper'
require 'test_support/home'

feature 'Home' do
  scenario 'has header' do
    home = Page::Home.new
    result = home.header?
    expect(result).to be true
  end
end
