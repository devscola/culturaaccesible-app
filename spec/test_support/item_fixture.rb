class Fixture
  class Item

    FIRST_NAME = 'First artwork name'
    SECOND_NAME = 'Second artwork name'
    AUTHOR = 'Yturralde'
    DATE = '1989'

    class << self
      def two_items_saved
        Fixture::Exhibition.pristine

        system_page = Page::SystemItem.new
        system_page.add_exhibition

        system_page = Page::SystemItem.new
        system_page.add_room(FIRST_NAME)

        system_page = Page::SystemItem.new
        system_page.add_scene(SECOND_NAME, AUTHOR, DATE)

        current = Page::Item.new
        current
      end

      def one_item_saved
        Fixture::Exhibition.pristine

        system_page = Page::SystemItem.new
        system_page.add_exhibition

        system_page.add_scene(SECOND_NAME, AUTHOR, DATE)

        current = Page::Item.new
        current
      end
    end
  end
end
