require 'spec_helper'
require 'test_support/exhibition'

feature 'Exhibition list' do
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

xfeature 'Exhibition detail' do
  scenario 'shows exhibition info' do
    list = Page::Exhibition.new
    result = list.has_extended_description?
    expect(result).to be true
  end
end
