require 'spec_helper'
require 'test_support/item'
require 'test_support/system_item'
require 'test_support/item_fixture'

feature 'Item detail' do
  scenario 'has detail information' do
    current = Page::Item.new
    expect(current.has_information?).to be true
  end

  scenario 'has media controls' do
    current = Page::Item.new
    current.click_toggle_play

    expect(current.is_paused?).to be false

    current.click_toggle_play

    expect(current.is_paused?).to be true
  end

  scenario 'next button leads to next item', :wip do
    current = Fixture::Item.saved
    current.click_next

    expect(has_content?(Fixture::Item::FIRST_NAME)).to be false
  end
end
