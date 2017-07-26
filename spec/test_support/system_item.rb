module Page
  class SystemItem
    include Capybara::DSL

    def initialize
      url='localhost:4567/'
      visit(url)
    end

    def add_exhibition
      system_page = Page::SystemExhibition.new
      system_page.add_exhibition
      system_page.check_show
      system_page.fill('name', 'Some Exhibition Name')
      system_page.fill('location', 'Some location')
      system_page.save_exhibition
    end

    def add_scene(name, author, date)
      has_css?('.plus-button', wait: 3)
      first('.plus-button').click

      fill_in('name', with: name)
      fill_in('author', with: author)
      fill_in('date', with: date)

      find('.submit').click
    end

    def add_room(name)
      has_css?('.plus-button', wait: 3)
      first('.plus-button').click

      find('.room').click
      fill_in('name', with: name)

      find('.submit').click
    end
  end
end

