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
      find('.bar-button-menutoggle').click
      find('#exhibitions').click
    end

    def validate!
      assert_selector('.bar-button-menutoggle')
      assert_selector('#exhibitions')
    end
  end
end
