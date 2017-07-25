class Fixture
  class Exhibition

    extend Capybara::DSL

    def self.filled_with_enough_info
      system_page = Page::SystemExhibition.new
      system_page.add_exhibition
      system_page.check_show
      system_page.fill('name', 'Some Exhibition Name')
      system_page.fill('location', 'Some location')
      system_page.save_exhibition

      current = Page::Exhibition.new
      current
    end

    def self.pristine
      url='localhost:4567/api/exhibition/flush'
      visit(url)
      self
    end
  end
end