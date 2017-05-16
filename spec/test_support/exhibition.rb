module Page
  class Exhibition
    include Capybara::DSL

    def initialize
      url = '/'
      visit(url)
      go_to_list_page()
      validate!
    end

    def title?
      has_content?('Exhibitions List')
    end

    def has_items?
      has_css?('#exhibition-list') && has_css?('.exhibition-item')
    end

    private

    def go_to_list_page()
      page.find('.bar-button-menutoggle').click
      page.find('#exhibitions').click
    end

    def validate!
      page.assert_selector('.bar-button-menutoggle')
      page.assert_selector('#exhibitions')
    end
  end
end
