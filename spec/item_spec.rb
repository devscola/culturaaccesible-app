require 'spec_helper'
require 'test_support/item'
require 'test_support/system_item'
require 'test_support/item_fixture'
require 'test_support/exhibition_fixture'

feature 'Item detail' do
  scenario 'has detail information' do
    current = Fixture::Item.one_item_saved

    expect(current.has_information?).to be true
  end

  scenario 'has media controls' do
    current = Fixture::Item.one_item_saved

    current.click_toggle_play

    expect(current.is_paused?).to be false

    current.click_toggle_play

    expect(current.is_paused?).to be true
  end

  scenario 'has navigation controls' do
    current = Fixture::Item.two_items_saved

    current.click_next
    expect(current.content?(Fixture::Item::FIRST_NAME)).to be false

    current.click_previous
    expect(current.content?(Fixture::Item::FIRST_NAME)).to be true
  end

  scenario 'returns to play action when navigation buttons are clicked' do
    current = Fixture::Item.two_items_saved

    current.click_toggle_play
    current.click_next

    expect(current.is_paused?).to be true
  end

  scenario 'has previous button disabled when item is the first one' do
    current = Fixture::Item.two_items_saved

    expect(current.previous_disabled?).to be true

    current.click_next

    expect(current.previous_disabled?).to be false

    current.click_previous

    expect(current.previous_disabled?).to be true
  end

  scenario 'has next button disabled when item is the last one' do
    current = Fixture::Item.two_items_saved

    expect(current.next_disabled?).to be false

    current.click_next

    expect(current.next_disabled?).to be true

    current.click_previous

    expect(current.next_disabled?).to be false

  end

  scenario 'has next and previous button disabled when there is only one item' do
    current = Fixture::Item.one_item_saved

    expect(current.next_disabled?).to be true
    expect(current.previous_disabled?).to be true
  end

  scenario 'changes video when navigate buttons is clicked' do
    current = Fixture::Item.two_items_saved
    previous_video_source = current.video_source

    current.click_next

    expect(current.video_source).not_to eq previous_video_source

    current.click_previous

    expect(current.video_source).to eq previous_video_source
  end

end
