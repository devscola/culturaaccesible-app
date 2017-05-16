require 'spec_helper'
require 'test_support/exhibition'

feature 'Exhibition List' do
  scenario 'has title' do
    list = Page::Exhibition.new
    result = list.title?
    expect(result).to be true
  end

  scenario 'has items' do
    list = Page::Exhibition.new
    result = list.has_items?
    expect(result).to be true
  end
end
