module Page
  class SystemExhibition
    include Capybara::DSL

    def initialize
      url='localhost:4567/'
      visit(url)
    end

    def add_exhibition
      find('#action').click
    end

    def check_show
      check('show')
    end

    def fill(input, content)
      fill_in(input, with: content)
    end

    def save_exhibition
      find('.submit').click
    end
  end
end

