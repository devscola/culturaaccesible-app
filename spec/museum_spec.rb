require 'spec_helper'
require 'test_support/museum'

feature 'Museum detail' do
  scenario 'has title' do
    current = Page::Museum.new
    result = current.title?
    expect(result).to be true
  end

  scenario 'has link to map' do
    current = Page::Museum.new
    expect(current.has_map_link?).to be true
  end

  scenario 'has schedule' do
    current = Page::Museum.new
    expect(current.has_schedule?).to be true
  end
end
