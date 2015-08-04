namespace('DashBanner')

class DashBanner.View extends Backbone.View

  @TIME_VISIBLE_IN_MILLISECONDS: 3000
  @ACTIVE_TIMER_ID = null
  @FLASH_TEMPLATE: DashBannerJST["scripts/dash_banner/flash_template.ejs"]
  @SHOW_TEMPLATE: DashBannerJST["scripts/dash_banner/show_template.ejs"]
  @ACTION_TEMPLATE: DashBannerJST["scripts/dash_banner/action_template.ejs"]

  events:
    "click [data-id=banner-close]": "_hideBanner"

  @flashSuccess: (message) ->
    view = new DashBanner.View
      message: message
      status: "success"
      target: $("[data-id=dash-banner-container]")
    view.flash(DashBanner.View.FLASH_TEMPLATE)

  @flashError: (message) ->
    view = new DashBanner.View
      message: message
      status: "error"
      target: $("[data-id=dash-banner-container]")
    view.flash(DashBanner.View.FLASH_TEMPLATE)

  @showSuccess: (message) ->
    view = new DashBanner.View
      message: message
      status: "success"
      target: $("[data-id=dash-banner-container]")
    view.show(DashBanner.View.SHOW_TEMPLATE)

  @showError: (message) ->
    view = new DashBanner.View
      message: message
      status: "error"
      target: $("[data-id=dash-banner-container]")
    view.show(DashBanner.View.SHOW_TEMPLATE)

  @showAction: (message, status) ->
    view = new DashBanner.View
      message: message
      status: status
      target: $("[data-id=dash-banner-container]")
    view.show(DashBanner.View.ACTION_TEMPLATE)

  @closeBanner: ->
    view = new DashBanner.View
      target: $("[data-id=dash-banner-container]")
    view.bannerContainer.html('')

  initialize: (options) ->
    @bannerContainer = options.target
    @message = options.message
    @status = options.status

  flash: (template) ->
    @render(template)
    timerId = setTimeout(@_hideBanner, DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS)
    DashBanner.View.ACTIVE_TIMER_ID = timerId
    @

  show: (template) ->
    @render(template)

  render: (template) ->
    @$el.html(template())
    @bannerContainer.html(@el)
    @_messageEl().text(@message)
    @_bannerEl().addClass('banner-'+@status)
    @_iconEl().addClass(@status+'-icon')
    clearTimeout(DashBanner.View.ACTIVE_TIMER_ID) if DashBanner.View.ACTIVE_TIMER_ID
    @

  activeTimerID: ->
    DashBanner.View.ACTIVE_TIMER_ID

  _hideBanner: =>
    DashBanner.View.ACTIVE_TIMER_ID = null
    @_bannerEl().slideUp(150, =>
      @bannerContainer.empty())

  _messageEl: ->
    @$("[data-id=banner-message]")

  _bannerEl: ->
    @$("[data-id=dash-banner]")

  _iconEl: ->
    @$("[data-id=banner-icon]")
  