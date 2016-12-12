import ACTION_TEMPLATE from "dash_banner/action_template.ejs"
import FLASH_TEMPLATE from "dash_banner/flash_template.ejs"
import SHOW_TEMPLATE from "dash_banner/show_template.ejs"
import DashBannerView from "dash_banner/view.js"

describe("DashBannerView", () => {

  var fixture;

  beforeEach(() => {
    fixture = setFixtures('<div data-id="dash-banner-container"></div>');
    $.fx.off = true;
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall()
  });

  var flashBanner = function(message) {
    var view = new DashBannerView({
      message: message,
      target: $("[data-id=dash-banner-container]")
    });
    return view.flash(FLASH_TEMPLATE);
  };

  var showBanner = function(message) {
    var view = new DashBannerView({
      message: message,
      target: $("[data-id=dash-banner-container]")
    });
    return view.show(SHOW_TEMPLATE);
  };

  var showAction = function(message, status, target) {
    var view = new DashBannerView({
      message: message,
      status: status,
      target: target || $("[data-id=dash-banner-container]")
    });
    return view.show(ACTION_TEMPLATE);
  };

  describe(" - flash banner", () => {

    it("shows the message", () => {
      var view = flashBanner("Hello");

      expect(view.$("[data-id=dash-banner]")).toHaveText("Hello");
    });

    it("appends the banner to the page", () => {
      var view = flashBanner("Hello");

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist();
    });

    it("removes the banner after a given amount of time", () => {
      var view = flashBanner("Hello");

      jasmine.clock().tick(DashBannerView.TIME_VISIBLE_IN_MILLISECONDS - 1);

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist();

      jasmine.clock().tick(1);
      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).not.toExist();
      expect(new DashBannerView({}).activeTimerID()).toBeNull();
    });

    it("shows and hides a second banner", () => {
      var view = flashBanner("Hello");
      jasmine.clock().tick(DashBannerView.TIME_VISIBLE_IN_MILLISECONDS + 1);

      view = flashBanner("Hello Again");

      jasmine.clock().tick(DashBannerView.TIME_VISIBLE_IN_MILLISECONDS);
      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).not.toExist();
    });

    it("resets the banner countdown", () => {
      var view = flashBanner("Hello");
      jasmine.clock().tick(DashBannerView.TIME_VISIBLE_IN_MILLISECONDS - 1);

      view = flashBanner("Hello Again");
      jasmine.clock().tick(1);
      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist();
    });
  });

  describe(" - show banner", () => {

    it("shows the message", () => {
      var view = showBanner("Hello");

      expect(view.$("[data-id=dash-banner]")).toHaveText("Hello");
    });

    it("appends the banner to the page", () => {
      var view = showBanner("Hello");

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist();
    });

    it("remains after flash banner would have closed (flash first)", () => {
      var view = flashBanner("Hello");
      jasmine.clock().tick(1);

      view = showBanner("Hello Again");
      jasmine.clock().tick(DashBannerView.TIME_VISIBLE_IN_MILLISECONDS);

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist();
    });

    it("hides after flash banner closes (show first)", () => {
      var view = showBanner("Hello");
      jasmine.clock().tick(1);

      view = flashBanner("Hello Again");
      jasmine.clock().tick(DashBannerView.TIME_VISIBLE_IN_MILLISECONDS);

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).not.toExist();
    });
  });

  describe(" - action banner", () => {

    it("shows the message", () => {
      var view = showAction("Hello");

      expect(view.$("[data-id=dash-banner]")).toHaveText("Hello");
    });

    it("uses the custom status", () => {
      var view = showAction("Hello", "custom-status");

      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--custom-status");
      expect(view.$("[data-id=banner-icon]")).toHaveClass("dashing-icon--custom-status");
    });

    it("appends the banner to the page", () => {
      var view = showAction("Hello");

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).toExist();
    });

    it("can attach to a custom target", () => {
      var $customTarget = $('<div data-id="custom-container"></div>');
      var view = showAction("Hello", "custom-status", $customTarget);
      expect($customTarget).toContainElement("[data-id=dash-banner]");
      expect($("[data-id=dash-banner-container]")).not.toContainElement("[data-id=dash-banner]");
    });
  });


  describe("Custom banners", () => {

    it("flashes a success message", () => {
      var view = DashBannerView.flashSuccess("Great Success!");
      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--success");
      expect(view.$("[data-id=banner-icon]")).toHaveClass("dashing-icon--checkmark");
      expect(view.$("[data-id=banner-message]")).toHaveText("Great Success!");
    });

    it("flashes an error message", () => {
      var view = DashBannerView.flashError("Something Bad Happened!");

      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--error");
      expect(view.$("[data-id=banner-icon]")).toHaveClass("dashing-icon--alert-filled");
      expect(view.$("[data-id=banner-message]").text()).toContain("Something Bad Happened!");
    });

    it("flashes an action", () => {
      var view = DashBannerView.flashAction("Some Action")

      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--undefined");
      expect(view.$("[data-id=banner-message]").text()).toContain("Some Action");
    })

    it("shows a success message", () => {
      var view = DashBannerView.showSuccess("Great Success!");

      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--success");
      expect(view.$("[data-id=banner-message]")).toHaveText("Great Success!");
    });

    it("shows an error message", () => {
      var view = DashBannerView.showError("Something Bad Happened!");

      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--error");
      expect(view.$("[data-id=banner-message]")).toHaveText("Something Bad Happened!");
    });

    it("shows an action message", () => {
      var view = DashBannerView.showAction("Something Bad Happened!");

      expect(view.$("[data-id=dash-banner]")).toHaveClass("dash-banner--undefined");
      expect(view.$("[data-id=banner-message]").text()).toContain("Something Bad Happened!");
    });
  });

  describe("Closing the banner", () => {
    it("removes the banner element", () => {
      let view = showBanner("Hello");

      view.$("[data-id=banner-close]").click()

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).not.toExist();
    });

    it("removes a banner in the global container", () => {
      let view = showBanner("Hello");

      DashBannerView.closeBanner()

      expect($("[data-id=dash-banner-container] [data-id=dash-banner]")).not.toExist();
    });

    it("removes a banner in the given container", () => {
      let container = $("<div>")
      new DashBannerView({
        message: "Some Message",
        target: container
      }).show(SHOW_TEMPLATE);

      DashBannerView.closeBanner(container)

      expect(container).toBeEmpty()
    });
  });

});
