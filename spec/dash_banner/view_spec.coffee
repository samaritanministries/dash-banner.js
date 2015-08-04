describe "DashBanner.View", ->

  beforeEach ->
    setFixtures('<div data-id="dash-banner-container"></div>')
    jQuery.fx.off = true
    jasmine.clock().install()

  afterEach ->
    jasmine.clock().uninstall()

  flashBanner = (message) ->
    view = new DashBanner.View
      message: message
      target: $("[data-id=dash-banner-container]")
    view.flash(DashBanner.View.FLASH_TEMPLATE)

  showBanner = (message) ->
    view = new DashBanner.View
      message: message
      target: $("[data-id=dash-banner-container]")
    view.show(DashBanner.View.SHOW_TEMPLATE)

  showAction = (message) ->
    view = new DashBanner.View
      message: message
      target: $("[data-id=dash-banner-container]")
    view.show(DashBanner.View.ACTION_TEMPLATE)

  describe " - flash banner", ->

    it "shows the message", ->
      view = flashBanner("Hello")

      expect(view.$("[data-id=dash-banner]")).toHaveText("Hello")

    it "appends the banner to the page", ->
      view = flashBanner("Hello")

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist()

    it "removes the banner after a given amount of time", ->
      view = flashBanner("Hello")

      jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS - 1)

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist()

      jasmine.clock().tick(1)
      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).not.toExist()
      expect(new DashBanner.View({}).activeTimerID()).toBeNull()

    it "shows and hides a second banner", ->
      view = flashBanner("Hello")
      jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS + 1)

      view = flashBanner("Hello Again")

      jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS)
      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).not.toExist()

    it "resets the banner countdown", ->
      view = flashBanner("Hello")
      jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS - 1)

      view = flashBanner("Hello Again")
      jasmine.clock().tick(1)
      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist()

  describe " - show banner", ->

    it "shows the message", ->
      view = showBanner("Hello")

      expect(view.$("[data-id=dash-banner]")).toHaveText("Hello")

    it "appends the banner to the page", ->
      view = showBanner("Hello")

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist()

    it "remains after flash banner would have closed (flash first)", ->
      view = flashBanner("Hello")
      jasmine.clock().tick(1)

      view = showBanner("Hello Again")
      jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS)

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist()

    it "hides after flash banner closes (show first)", ->
      view = showBanner("Hello")
      jasmine.clock().tick(1)

      view = flashBanner("Hello Again")
      jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS)

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).not.toExist()

  describe " - action banner", ->

    it "shows the message", ->
      view = showAction("Hello")

      expect(view.$("[data-id=dash-banner]")).toHaveText("Hello")

    it "appends the banner to the page", ->
      view = showAction("Hello")

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist()


  describe "Custom banners", ->

    it "shows a success message", ->
      view = DashBanner.View.flashSuccess("Great Success!")
      expect(view.$("[data-id=dash-banner]")).toHaveClass("banner-success")
      expect(view.$("[data-id=banner-message]")).toHaveText("Great Success!")

    it "shows an error message", ->
      view = DashBanner.View.flashError("Something Bad Happened!")

      expect(view.$("[data-id=dash-banner]")).toHaveClass("banner-error")
      expect(view.$("[data-id=banner-message]").text()).toContain("Something Bad Happened!")

    it "shows an action message", ->
      view = DashBanner.View.showAction("Something Bad Happened!")

      expect(view.$("[data-id=dash-banner]")).toHaveClass("action-banner")
      expect(view.$("[data-id=banner-message]").text()).toContain("Something Bad Happened!")
