(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  namespace("SampleApp");

  SampleApp.ShowBannerView = (function(superClass) {
    extend(ShowBannerView, superClass);

    function ShowBannerView() {
      return ShowBannerView.__super__.constructor.apply(this, arguments);
    }

    ShowBannerView.prototype.events = {
      "click [data-id=flash-success-banner]": "flashSuccessBanner",
      "click [data-id=flash-error-banner]": "flashErrorBanner",
      "click [data-id=flash-action-banner]": "flashActionBanner",
      "click [data-id=show-success-banner]": "showSuccessBanner",
      "click [data-id=show-error-banner]": "showErrorBanner",
      "click [data-id=show-action-banner]": "showActionBanner",
      "click [data-id=close-banner]": "closeBanner"
    };

    ShowBannerView.prototype.flashSuccessBanner = function(event) {
      return DashBanner.View.flashSuccess("Some Success Message " + event.timeStamp);
    };

    ShowBannerView.prototype.flashErrorBanner = function(event) {
      return DashBanner.View.flashError("Some Error Message " + event.timeStamp);
    };

    ShowBannerView.prototype.flashActionBanner = function(event) {
      return DashBanner.View.flashAction("Some Action Message " + event.timeStamp);
    };

    ShowBannerView.prototype.showSuccessBanner = function(event) {
      return DashBanner.View.showSuccess("Some Success Message " + event.timeStamp);
    };

    ShowBannerView.prototype.showErrorBanner = function(event) {
      return DashBanner.View.showError("Some Error Message " + event.timeStamp);
    };

    ShowBannerView.prototype.showActionBanner = function(event) {
      return DashBanner.View.showAction("Some Action Message " + event.timeStamp);
    };

    ShowBannerView.prototype.closeBanner = function() {
      return DashBanner.View.closeBanner();
    };

    return ShowBannerView;

  })(Backbone.View);

}).call(this);
