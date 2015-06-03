describe "DashBanner.View", ->

  beforeEach ->
    setFixtures('<div data-id="dash-banner-container"></div>')
    jQuery.fx.off = true
    jasmine.clock().install()

  afterEach ->
    jasmine.clock().uninstall()

  showBanner = (message) ->
    view = new DashBanner.View
      message: message
      target: $("[data-id=dash-banner-container]")
    view.flash()

  it "shows the message", ->
    view = showBanner("Hello")

    expect(view.$("[data-id=dash-banner]")).toHaveText("Hello")

  it "appends the banner to the page", ->
    view = showBanner("Hello")

    expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist()

  it "removes the banner after a given amount of time", ->
    view = showBanner("Hello")

    jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS - 1)

    expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist()

    jasmine.clock().tick(1)
    expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).not.toExist()
    expect(new DashBanner.View({}).activeTimerID()).toBeNull()

  it "resets the banner countdown", ->
    view = showBanner("Hello")
    jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS - 1)

    view = showBanner("Hello Again")
    jasmine.clock().tick(1)
    expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist()

  it "shows and hides a second banner", ->
    view = showBanner("Hello")
    jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS + 1)

    view = showBanner("Hello Again")

    jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS)
    expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).not.toExist()

  describe "Custom banners", ->

    it "shows a success message", ->
      view = DashBanner.View.flashSuccess("Great Success!")

      expect(view.$("[data-id=dash-banner]")).toHaveClass("success")
      expect(view.$("[data-id=banner-message]")).toHaveText("Great Success!")

    it "shows an error message", ->
      view = DashBanner.View.flashError("Something Bad Happened!")

      expect(view.$("[data-id=dash-banner]")).toHaveClass("error")
      expect(view.$("[data-id=banner-message]").text()).toContain("Something Bad Happened!")
