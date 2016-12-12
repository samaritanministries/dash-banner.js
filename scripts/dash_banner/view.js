import ACTION_TEMPLATE from "dash_banner/action_template.ejs"
import FLASH_TEMPLATE from "dash_banner/flash_template.ejs"
import SHOW_TEMPLATE from "dash_banner/show_template.ejs"

DashBannerView = class View extends Backbone.View {

  events() {
    return {"click [data-id=banner-close]": "_hideBanner"}
  }

  static flashSuccess(message) {
    let view = new DashBannerView({
      message: message,
      status: "success",
      target: $("[data-id=dash-banner-container]")
    })
    return view.flash(FLASH_TEMPLATE)
  }

  static flashError(message) {
    let view = new DashBannerView({
      message: message,
      status: "error",
      target: $("[data-id=dash-banner-container]")
    })
    return view.flash(FLASH_TEMPLATE)
  }

  static flashAction(message, status, target) {
    let view = new DashBannerView({
      message: message,
      status: status,
      target: target || $("[data-id=dash-banner-container]")
    })
    return view.flash(ACTION_TEMPLATE)
  }

  static showSuccess(message) {
    let view = new DashBannerView({
      message: message,
      status: "success",
      target: $("[data-id=dash-banner-container]")
    })
    return view.show(SHOW_TEMPLATE)
  }

  static showError(message) {
    let view = new DashBannerView({
      message: message,
      status: "error",
      target: $("[data-id=dash-banner-container]")
    })
    return view.show(SHOW_TEMPLATE)
  }

  static showAction(message, status, target) {
    let view = new DashBannerView({
      message: message,
      status: status,
      target: target || $("[data-id=dash-banner-container]")
    })
    return view.show(ACTION_TEMPLATE)
  }

  static closeBanner(target) {
    let view = new DashBannerView({
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
    let timerId = setTimeout(this._hideBanner.bind(this), DashBannerView.TIME_VISIBLE_IN_MILLISECONDS)
    DashBannerView.ACTIVE_TIMER_ID = timerId
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
    if (DashBannerView.ACTIVE_TIMER_ID) {
      clearTimeout(DashBannerView.ACTIVE_TIMER_ID)
    }
    return this
  }

  activeTimerID() {
    return DashBannerView.ACTIVE_TIMER_ID
  }

  _hideBanner() {
    DashBannerView.ACTIVE_TIMER_ID = null
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
DashBannerView.ACTIVE_TIMER_ID = null
DashBannerView.TIME_VISIBLE_IN_MILLISECONDS = 3000

export default DashBannerView
