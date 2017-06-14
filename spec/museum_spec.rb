require 'spec_helper'
require 'test_support/museum'
require_relative 'test_support/museum_fixture'
require_relative 'test_support/system_museum'


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

  scenario 'hides empty sections' do
    current = Fixture::Museum.filled_with_some_info

    expect(current.has_price?). to be false
  end

  scenario 'shows filled sections' do
    current = Fixture::Museum.filled_with_some_info

    expect(current.has_contact?). to be true
  end
end
