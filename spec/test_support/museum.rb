module Page
  class Museum
    include Capybara::DSL

    def initialize
      url = '/'
      visit(url)
      go_to_museum_detail
      validate!
    end

    def title?(title = 'Museum detail')
      has_content?(title)
    end

    def enter_museum
      find('.enter').click
    end

    def has_price?
      has_css?('.price')
    end

    def has_contact?
      has_css?('.contact')
    end

    def back
      find('.back-button').click
    end

    private

    def go_to_museum_detail
      find('.bar-button-menutoggle').click
      sleep 1
      find('#exhibitions').click
      first('.exhibition-item', :match => :first, wait: 5).click
      find('#enter-museum').click
    end

    def validate!
      assert_selector('.back-button')
      assert_selector('#name')
      assert_selector('#info')
    end
  end
end
