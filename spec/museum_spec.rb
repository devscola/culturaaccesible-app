require 'spec_helper'
require 'test_support/museum'

feature 'Museum detail' do
  scenario 'has title' do
    current = Page::Museum.new
    expect(current.title?).to be true
  end
end
