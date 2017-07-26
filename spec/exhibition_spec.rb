require 'spec_helper'
require 'test_support/exhibition'
require 'test_support/exhibition_fixture'
require 'test_support/item_fixture'
require 'test_support/system_exhibition'

feature 'Exhibition list' do
  scenario 'alerts if there is not exhibitions' do
    Fixture::Exhibition.pristine
    current = Page::Exhibition.new
    expect(current.has_items?).to be false
    expect(current.has_empty_list_alert?).to be true
  end

  scenario 'has exhibition items' do
    current = Fixture::Exhibition.filled_with_enough_info

    expect(current.has_items?).to be true
  end

  scenario 'goes to exhibition detail' do
    current = Fixture::Exhibition.filled_with_enough_info

    current.go_to_detail

    expect(current.detail_page?).to be true
  end

  scenario 'shows item list' do
    Fixture::Exhibition.pristine
    Fixture::Item.saved
    current = Page::Exhibition.new

    current.go_to_detail

    expect(current.has_item_list?).to be true
    expect(current.has_item_detail?).to be true

    current.go_to_item_view

    expect(current.is_item_page?).to be true
  end
end
