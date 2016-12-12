namespace('DashBanner')

DashBanner.View = class View extends Backbone.View {

  events() {
    return {"click [data-id=banner-close]": "_hideBanner"}
  }

  static flashSuccess(message) {
    let view = new DashBanner.View({
      message: message,
      status: "success",
      target: $("[data-id=dash-banner-container]")
    })
    return view.flash(DashBanner.View.FLASH_TEMPLATE)
  }

  static flashError(message) {
    let view = new DashBanner.View({
      message: message,
      status: "error",
      target: $("[data-id=dash-banner-container]")
    })
    return view.flash(DashBanner.View.FLASH_TEMPLATE)
  }

  static flashAction(message, status, target) {
    let view = new DashBanner.View({
      message: message,
      status: status,
      target: target || $("[data-id=dash-banner-container]")
    })
    return view.flash(DashBanner.View.ACTION_TEMPLATE)
  }

  static showSuccess(message) {
    let view = new DashBanner.View({
      message: message,
      status: "success",
      target: $("[data-id=dash-banner-container]")
    })
    return view.show(DashBanner.View.SHOW_TEMPLATE)
  }

  static showError(message) {
    let view = new DashBanner.View({
      message: message,
      status: "error",
      target: $("[data-id=dash-banner-container]")
    })
    return view.show(DashBanner.View.SHOW_TEMPLATE)
  }

  static showAction(message, status, target) {
    let view = new DashBanner.View({
      message: message,
      status: status,
      target: target || $("[data-id=dash-banner-container]")
    })
    return view.show(DashBanner.View.ACTION_TEMPLATE)
  }

  static closeBanner(target) {
    let view = new DashBanner.View({
      target: target || $("[data-id=dash-banner-container]")
    })
    view.bannerContainer.html('')
  }

  initialize(options) {
    this.bannerContainer = options.target
    this.message = options.message
    this.status = options.status
  }

  flash(template) {
    this.render(template)
    let timerId = setTimeout(this._hideBanner.bind(this), DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS)
    DashBanner.View.ACTIVE_TIMER_ID = timerId
    return this
  }

  show(template) {
    return this.render(template)
  }

  render(template) {
    this.$el.html(template())
    this.bannerContainer.html(this.el)
    this._messageEl().text(this.message)

    this._bannerEl().addClass("dash-banner--" + this.status)
    if (this.status == "error") {
      this._iconEl().addClass("dashing-icon--alert-filled")
    } else if (this.status == "success") {
      this._iconEl().addClass("dashing-icon--checkmark")
    } else {
      this._iconEl().addClass("dashing-icon--" + this.status)
    }
    if (DashBanner.View.ACTIVE_TIMER_ID) {
      clearTimeout(DashBanner.View.ACTIVE_TIMER_ID)
    }
    return this
  }

  activeTimerID() {
    return DashBanner.View.ACTIVE_TIMER_ID
  }

  _hideBanner() {
    DashBanner.View.ACTIVE_TIMER_ID = null
    this._bannerEl().slideUp(150, () => {
      this.bannerContainer.empty()
    })
  }

  _messageEl() {
    return this.$("[data-id=banner-message]")
  }

  _bannerEl() {
    return this.$("[data-id=dash-banner]")
  }

  _iconEl() {
    return this.$("[data-id=banner-icon]")
  }

}
DashBanner.View.ACTION_TEMPLATE = DashBannerJST["scripts/dash_banner/action_template.ejs"]
DashBanner.View.FLASH_TEMPLATE = DashBannerJST["scripts/dash_banner/flash_template.ejs"]
DashBanner.View.SHOW_TEMPLATE = DashBannerJST["scripts/dash_banner/show_template.ejs"]
DashBanner.View.ACTIVE_TIMER_ID = null
DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS = 3000
