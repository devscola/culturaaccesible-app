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

    def add_item(name)
      has_css?('.plus-button', wait: 3)
      first('.plus-button').click

      fill_in('name', with: name)
      fill_in('description', with: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')

      find('.submit').click
    end
  end
end

