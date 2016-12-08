(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  namespace('DashBanner');

  DashBanner.View = (function(superClass) {
    extend(View, superClass);

    function View() {
      this._hideBanner = bind(this._hideBanner, this);
      return View.__super__.constructor.apply(this, arguments);
    }

    View.TIME_VISIBLE_IN_MILLISECONDS = 3000;

    View.ACTIVE_TIMER_ID = null;

    View.FLASH_TEMPLATE = DashBannerJST["scripts/dash_banner/flash_template.ejs"];

    View.SHOW_TEMPLATE = DashBannerJST["scripts/dash_banner/show_template.ejs"];

    View.ACTION_TEMPLATE = DashBannerJST["scripts/dash_banner/action_template.ejs"];

    View.prototype.events = {
      "click [data-id=banner-close]": "_hideBanner"
    };

    View.flashSuccess = function(message) {
      var view;
      view = new DashBanner.View({
        message: message,
        status: "success",
        target: $("[data-id=dash-banner-container]")
      });
      return view.flash(DashBanner.View.FLASH_TEMPLATE);
    };

    View.flashError = function(message) {
      var view;
      view = new DashBanner.View({
        message: message,
        status: "error",
        target: $("[data-id=dash-banner-container]")
      });
      return view.flash(DashBanner.View.FLASH_TEMPLATE);
    };

    View.flashAction = function(message, status, target) {
      var view;
      view = new DashBanner.View({
        message: message,
        status: status,
        target: target || $("[data-id=dash-banner-container]")
      });
      return view.flash(DashBanner.View.ACTION_TEMPLATE);
    };

    View.showSuccess = function(message) {
      var view;
      view = new DashBanner.View({
        message: message,
        status: "success",
        target: $("[data-id=dash-banner-container]")
      });
      return view.show(DashBanner.View.SHOW_TEMPLATE);
    };

    View.showError = function(message) {
      var view;
      view = new DashBanner.View({
        message: message,
        status: "error",
        target: $("[data-id=dash-banner-container]")
      });
      return view.show(DashBanner.View.SHOW_TEMPLATE);
    };

    View.showAction = function(message, status, target) {
      var view;
      view = new DashBanner.View({
        message: message,
        status: status,
        target: target || $("[data-id=dash-banner-container]")
      });
      return view.show(DashBanner.View.ACTION_TEMPLATE);
    };

    View.closeBanner = function(target) {
      var view;
      view = new DashBanner.View({
        target: target || $("[data-id=dash-banner-container]")
      });
      return view.bannerContainer.html('');
    };

    View.prototype.initialize = function(options) {
      this.bannerContainer = options.target;
      this.message = options.message;
      return this.status = options.status;
    };

    View.prototype.flash = function(template) {
      var timerId;
      this.render(template);
      timerId = setTimeout(this._hideBanner, DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS);
      DashBanner.View.ACTIVE_TIMER_ID = timerId;
      return this;
    };

    View.prototype.show = function(template) {
      return this.render(template);
    };

    View.prototype.render = function(template) {
      this.$el.html(template());
      this.bannerContainer.html(this.el);
      this._messageEl().text(this.message);
      this._bannerEl().addClass('dash-banner--' + this.status);
      if (this.status === 'error') {
        this._iconEl().addClass('dashing-icon--alert-filled');
      } else if (this.status === 'success') {
        this._iconEl().addClass('dashing-icon--checkmark');
      } else {
        this._iconEl().addClass('dashing-icon--' + this.status);
      }
      if (DashBanner.View.ACTIVE_TIMER_ID) {
        clearTimeout(DashBanner.View.ACTIVE_TIMER_ID);
      }
      return this;
    };

    View.prototype.activeTimerID = function() {
      return DashBanner.View.ACTIVE_TIMER_ID;
    };

    View.prototype._hideBanner = function() {
      DashBanner.View.ACTIVE_TIMER_ID = null;
      return this._bannerEl().slideUp(150, (function(_this) {
        return function() {
          return _this.bannerContainer.empty();
        };
      })(this));
    };

    View.prototype._messageEl = function() {
      return this.$("[data-id=banner-message]");
    };

    View.prototype._bannerEl = function() {
      return this.$("[data-id=dash-banner]");
    };

    View.prototype._iconEl = function() {
      return this.$("[data-id=banner-icon]");
    };

    return View;

  })(Backbone.View);

}).call(this);
