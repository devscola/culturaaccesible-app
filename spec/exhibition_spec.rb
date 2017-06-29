require 'spec_helper'
require 'test_support/exhibition'
require 'test_support/exhibition_fixture'
require 'test_support/system_exhibition'

feature 'Exhibition list' do
  scenario 'alerts if there is not exhibitions' do
    current = Page::Exhibition.new
    expect(current.has_items?).to be false
    expect(current.has_empty_list_alert?).to be true
  end

  scenario 'has items' do
    current = Fixture::Exhibition.filled_with_enough_info

    expect(current.has_items?).to be true
  end

  scenario 'goes to exhibition detail' do
    current = Fixture::Exhibition.filled_with_enough_info

    current.go_to_detail

    expect(current.detail_page?).to be true
  end
end
