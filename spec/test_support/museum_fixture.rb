class Fixture
  class Museum
    class << self
      def initial_state
        current = Page::Museum.new
        current
      end
      
      def filled_with_some_info
        system_page = Page::SystemMuseum.new
        system_page.add_museum
        system_page.fill('name', 'Museum Name')
        system_page.fill('street', 'Some street')
        system_page.fill('phone1', '123456789')
        system_page.save_museum

        initial_state
      end

      def filled_with_link(link)
        system_page = Page::SystemMuseum.new
        system_page.add_museum
        system_page.fill('name', 'Museum name')
        system_page.fill('link', link)
        system_page.save_museum

        initial_state
      end
    end
  end
end