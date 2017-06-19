require 'spec_helper'
require 'test_support/museum'
require_relative 'test_support/museum_fixture'
require_relative 'test_support/system_museum'


feature 'Museum detail' do
  scenario 'has title' do
    current = Fixture::Museum.initial_state
    expect(current.title?).to be true
  end

  scenario 'go to exhibition list page with enter button' do
    current = Fixture::Museum.initial_state
    current.enter_museum
    expect(current.title?('Exhibitions list')).to be(true)
  end

  scenario 'hides empty sections' do
    current = Fixture::Museum.filled_with_some_info

    expect(current.has_price?).to be false
  end

  scenario 'shows filled sections' do
    current = Fixture::Museum.filled_with_some_info

    expect(current.has_contact?).to be true
  end

  scenario 'back button goes to exhibition list' do
    current = Fixture::Museum.initial_state
    current.back
    expect(current.title?('Exhibitions detail'))
  end

  scenario "doesn't shows the map link" do
    current = Fixture::Museum.filled_with_link('invalid link')

    expect(current.has_link?).to be false
  end

  scenario "doesn't show blank field icon", :wip do
    current = Fixture::Museum.focus_in_field_without_fill_content

    expect(current.has_css?("[name='link']")).to be false
  end
end