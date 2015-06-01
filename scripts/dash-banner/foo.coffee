namespace("DashBanner")

class DashBanner.Foo extends Backbone.View

  template: DashBannerJST['scripts/dash-banner/foo_template.ejs']

  render: ->
    @$el.html(@template())
    @
