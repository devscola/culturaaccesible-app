class Fixture
  class Museum
    extend Capybara::DSL

    def self.filled_with_basic_info
      system_page = Page::SystemMuseum.new
      system_page.add_museum
      system_page.fill('name', 'Museum Name')
      system_page.fill('street', 'Some street')
      # system_page.fill('link', 'https://www.google.es/maps/@39.4748109,-0.3860241,16z?hl=es')
      system_page.save_museum

      current = Page::Museum.new
      current
    end
  end
end