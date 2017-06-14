class Fixture
  class Museum
    extend Capybara::DSL

    def self.filled_with_some_info
      system_page = Page::SystemMuseum.new
      system_page.add_museum
      system_page.fill('name', 'Museum Name')
      system_page.fill('street', 'Some street')
      system_page.fill('phone1', '123456789')
      system_page.save_museum

      current = Page::Museum.new
      current
    end
  end
end