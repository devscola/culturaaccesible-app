module Page
  class Home
    include Capybara::DSL

    def initialize
      url = '/'
      visit(url)
      validate!
    end

    def header?
      has_css?('.header')
    end

    private

    def validate!
      page.assert_selector('.scroll-content')
    end
  end
end
