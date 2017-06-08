require 'spec_helper'
require 'test_support/museum'

feature 'Museum detail' do
  scenario 'has title' do
    current = Page::Museum.new
    expect(current.title?).to be true
  end

  scenario 'go to exhibition list page with enter button' do
    current = Page::Museum.new
    current.enter_museum
    expect(current.title?('Exhibitions list')).to be(true)
  end
end
