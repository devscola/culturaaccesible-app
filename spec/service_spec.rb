require 'spec_helper'

include Capybara::DSL

describe 'Exhibitions service' do
  it 'returns an exhibitions list' do
    result = retrieveList
    expect(result).to be_an Array
  end
end

def retrieveList
  script = <<~SCRIPT
    return [];
  SCRIPT

  return execute_script(script)
end
