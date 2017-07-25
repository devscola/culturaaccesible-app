class Fixture
  class Item

    FIRST_NAME = 'First artwork name'
    SECOND_NAME = 'Second artwork name'

    class << self
      def saved
        system_page = Page::SystemItem.new
        system_page.add_exhibition

        system_page.add_item(FIRST_NAME)

        system_page = Page::SystemItem.new

        system_page.add_item(SECOND_NAME)

        current = Page::Item.new
        current
      end
    end
  end
end
