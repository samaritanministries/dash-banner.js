describe "DashBanner.View", ->

  beforeEach ->
    @fixture = setFixtures('<div data-id="dash-banner-container"></div>')
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

  showAction = (message, status, target) ->
    view = new DashBanner.View
      message: message
      status: status
      target: target || $("[data-id=dash-banner-container]")
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

    it "uses the custom status", ->
      view = showAction("Hello", "custom-status")

      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--custom-status")
      expect(view.$("[data-id=banner-icon]")).toHaveClass("dashing-icon--custom-status")

    it "appends the banner to the page", ->
      view = showAction("Hello")

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist()

    it "can attach to a custom target", ->
      $customTarget = $('<div data-id="custom-container"></div>')
      view = showAction("Hello", "custom-status", $customTarget)
      expect($customTarget).toContainElement("[data-id=dash-banner]")
      expect($("[data-id=dash-banner-container]")).not.toContainElement("[data-id=dash-banner]")


  describe "Custom banners", ->

    it "shows a success message", ->
      view = DashBanner.View.flashSuccess("Great Success!")
      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--success")
      expect(view.$("[data-id=banner-message]")).toHaveText("Great Success!")

    it "shows an error message", ->
      view = DashBanner.View.flashError("Something Bad Happened!")

      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--error")
      expect(view.$("[data-id=banner-message]").text()).toContain("Something Bad Happened!")

    it "shows an action message", ->
      view = DashBanner.View.showAction("Something Bad Happened!")

      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--undefined")
      expect(view.$("[data-id=banner-message]").text()).toContain("Something Bad Happened!")

