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
      has_css?('.enter', wait: 10)
      find('.enter').click
    end

    def has_price?
      has_css?('.price')
    end

    def has_contact?
      has_css?('.contact')
    end

    def has_link?
      has_content?('Show map')
    end

    def back
      find('.back-button').click
    end

    private

    def go_to_museum_detail
      find('.bar-button-menutoggle').click
      sleep 0.5
      find('#exhibitions').click
      sleep 0.5
      first('.exhibition-item', :match => :first, wait: 5).click
      sleep 5
      find('#enter-museum').click
    end

    def validate!
      assert_selector('.back-button')
      assert_selector('#name')
      assert_selector('#info')
    end
  end
end
