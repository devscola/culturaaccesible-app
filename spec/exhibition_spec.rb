require 'spec_helper'
require 'test_support/exhibition'

feature 'Exhibition list' do
  scenario 'has title' do
    list = Page::Exhibition.new
    result = list.title?
    expect(result).to be true
  end

  xscenario 'has items' do
    list = Page::Exhibition.new
    result = list.has_items?
    expect(result).to be true
  end
end

feature 'Exhibition detail' do
  xscenario 'shows exhibition info' do
    list = Page::Exhibition.new
    result = list.has_extended_description?
    expect(result).to be true
  end
end
