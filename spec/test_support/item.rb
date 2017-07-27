module Page
  class Item
    include Capybara::DSL

    def initialize
      url = '/#/exhibition-list/'
      visit(url)
      go_to_item_detail
      validate!
    end

    def go_to_item_detail
      first('.exhibition-item').click
      has_css?('.item', wait: 4)
      first('.item').click
    end

    def has_information?
      has_css?('.title')
      has_css?('.description')
      has_css?('.scrollable .scroll-content')
    end

    def content?(text)
      has_content?(text)
    end

    def click_toggle_play
      has_css?('.toggle-play', wait: 4)
      find('.toggle-play').click
    end

    def is_paused?
      has_css?('.play', wait: 4)
    end

    def click_next
      has_css?('.next', wait: 4)
      find('.next').click
    end

    def click_previous
      has_css?('.previous', wait: 4)
      find('.previous').click
    end

    def previous_disabled?
      has_css?('.previous:disabled')
    end

    def next_disabled?
      has_css?('.next:disabled')
    end

    def video_source
      find('video')[:src]
    end

    private

    def validate!
      assert_selector('video')
    end
  end
end
