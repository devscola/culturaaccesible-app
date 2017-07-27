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

    def has_item_list?
      has_css?('.item', wait:2)
    end

    def has_item_detail?
      has_content?('Yturralde') && has_content?('1989')
    end

    def has_empty_list_alert?
      has_css?('.alert-message')
    end

    def go_to_detail
      has_css?('.exhibition-item', wait: 5)
      find('.exhibition-item', :match => :first, wait: 5).click
    end

    def detail_page?
      has_css?('#exhibition-detail', wait: 5)
    end

    def go_to_item_view
      first('.item-info').click
    end

    def is_item_page?
      has_css?('.title')
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
