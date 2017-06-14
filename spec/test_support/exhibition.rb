module Page
  class Exhibition
    include Capybara::DSL

    def initialize
      url = '/'
      visit(url)
      go_to_list_page
      validate!
    end

    def title?
      has_content?('Exhibitions list')
    end

    def has_items?
      has_css?('#exhibition-list', wait:2) && has_css?('.exhibition-item', wait:2)
    end

    def go_to_detail
      find('.exhibition-item', :match => :first, wait: 5).click
    end

    def detail_page?
      has_content?('Exhibition detail')
    end

    private

    def go_to_list_page
      find('.bar-button-menutoggle').click
      sleep 1
      find('#exhibitions').click
    end

    def validate!
      assert_selector('.bar-button-menutoggle')
      assert_selector('#exhibitions', visible: false)
    end
  end
end
