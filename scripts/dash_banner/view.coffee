namespace('DashBanner')

class DashBanner.View extends Backbone.View

  @TIME_VISIBLE_IN_MILLISECONDS: 3000

  template: DashBannerJST["scripts/dash_banner/view_template.ejs"]

  @flashSuccess: (message) ->
    view = new DashBanner.View
      message: message
      status: "success"
      target: $("[data-id=dash-banner-container]")
    view.flash()

  @flashError: (message) ->
    view = new DashBanner.View
      message: message
      status: "error"
      target: $("[data-id=dash-banner-container]")
    view.flash()

  initialize: (options) ->
    @bannerContainer = options.target
    @message = options.message
    @status = options.status

  render: ->
    @$el.html(@template())
    @bannerContainer.html(@el)
    @_messageEl().text(@message)
    @_bannerEl().addClass(@status)
    @

  flash: ->
    @render()
    setTimeout(@_hideBanner, DashBanner.View.TIME_VISIBLE_IN_MILLISECONDS)
    @

  _hideBanner: =>
    @_bannerEl().slideUp(150, =>
      @bannerContainer.empty())

  _messageEl: ->
    @$("[data-id=banner-message]")

  _bannerEl: ->
    @$("[data-id=dash-banner]")
