module Page
  class Item
    include Capybara::DSL

    def initialize
      url = '/#/item-detail'
      visit(url)
      validate!
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
      find('.toggle-play').click
    end

    def is_paused?
      has_css?('.play')
    end

    def click_next
      has_css?('.next', wait: 4)
      find('.next').click
    end

    def click_preview
      has_css?('.preview', wait: 4)
      find('.preview').click
    end

    private

    def validate!
      assert_selector('.bar-button-menutoggle')
      assert_selector('#video')
    end
  end
end
