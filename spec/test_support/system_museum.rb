module Page
  class SystemMuseum
    include Capybara::DSL

    def initialize
      url='localhost:4567/museum'
      visit(url)
    end

    def add_museum
      find('#newMuseum').click
    end

    def fill(input, content)
      fill_in(input, with: content)
    end

    def save_museum
      find('#action').click
    end
  end
end
