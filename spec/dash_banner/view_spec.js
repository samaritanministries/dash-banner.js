describe("DashBanner.View", function() {

  beforeEach(function() {
    this.fixture = setFixtures('<div data-id="dash-banner-container"></div>');
    jQuery.fx.off = true;
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall()
  });

  var flashBanner = function(message) {
    var view = new DashBanner.View({
      message: message,
      target: $("[data-id=dash-banner-container]")
    });
    return view.flash(DashBanner.View.FLASH_TEMPLATE);
  };

  var showBanner = function(message) {
    var view = new DashBanner.View({
      message: message,
      target: $("[data-id=dash-banner-container]")
    });
    return view.show(DashBanner.View.SHOW_TEMPLATE);
  };

  var showAction = function(message, status, target) {
    var view = new DashBanner.View({
      message: message,
      status: status,
      target: target || $("[data-id=dash-banner-container]")
    });
    return view.show(DashBanner.View.ACTION_TEMPLATE);
  };

  describe(" - flash banner", function() {

    it("shows the message", function() {
      var view = flashBanner("Hello");

      expect(view.$("[data-id=dash-banner]")).toHaveText("Hello");
    });

    it("appends the banner to the page", function() {
      var view = flashBanner("Hello");

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist();
    });

    it("removes the banner after a given amount of time", function() {
      var view = flashBanner("Hello");

      jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS - 1);

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist();

      jasmine.clock().tick(1);
      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).not.toExist();
      expect(new DashBanner.View({}).activeTimerID()).toBeNull();
    });

    it("shows and hides a second banner", function() {
      var view = flashBanner("Hello");
      jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS + 1);

      view = flashBanner("Hello Again");

      jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS);
      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).not.toExist();
    });

    it("resets the banner countdown", function() {
      var view = flashBanner("Hello");
      jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS - 1);

      view = flashBanner("Hello Again");
      jasmine.clock().tick(1);
      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist();
    });
  });

  describe(" - show banner", function() {

    it("shows the message", function() {
      var view = showBanner("Hello");

      expect(view.$("[data-id=dash-banner]")).toHaveText("Hello");
    });

    it("appends the banner to the page", function() {
      var view = showBanner("Hello");

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist();
    });

    it("remains after flash banner would have closed (flash first)", function() {
      var view = flashBanner("Hello");
      jasmine.clock().tick(1);

      view = showBanner("Hello Again");
      jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS);

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist();
    });

    it("hides after flash banner closes (show first)", function() {
      var view = showBanner("Hello");
      jasmine.clock().tick(1);

      view = flashBanner("Hello Again");
      jasmine.clock().tick(DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS);

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).not.toExist();
    });
  });

  describe(" - action banner", function() {

    it("shows the message", function() {
      var view = showAction("Hello");

      expect(view.$("[data-id=dash-banner]")).toHaveText("Hello");
    });

    it("uses the custom status", function() {
      var view = showAction("Hello", "custom-status");

      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--custom-status");
      expect(view.$("[data-id=banner-icon]")).toHaveClass("dashing-icon--custom-status");
    });

    it("appends the banner to the page", function() {
      var view = showAction("Hello");

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist();
    });

    it("can attach to a custom target", function() {
      var $customTarget = $('<div data-id="custom-container"></div>');
      var view = showAction("Hello", "custom-status", $customTarget);
      expect($customTarget).toContainElement("[data-id=dash-banner]");
      expect($("[data-id=dash-banner-container]")).not.toContainElement("[data-id=dash-banner]");
    });
  });


  describe("Custom banners", function() {

    it("shows a success message", function() {
      var view = DashBanner.View.flashSuccess("Great Success!");
      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--success");
      expect(view.$("[data-id=banner-message]")).toHaveText("Great Success!");
    });

    it("shows an error message", function() {
      var view = DashBanner.View.flashError("Something Bad Happened!");

      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--error");
      expect(view.$("[data-id=banner-message]").text()).toContain("Something Bad Happened!");
    });

    it("shows an action message", function() {
      var view = DashBanner.View.showAction("Something Bad Happened!");

      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--undefined");
      expect(view.$("[data-id=banner-message]").text()).toContain("Something Bad Happened!");
    });
  });
});
