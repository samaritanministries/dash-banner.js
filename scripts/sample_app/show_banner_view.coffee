namespace("SampleApp")

class SampleApp.ShowBannerView extends Backbone.View

  events:
    "click [data-id=show-success-banner]": "showSuccessBanner"
    "click [data-id=show-error-banner]": "showErrorBanner"

  showSuccessBanner: (event) ->
    DashBanner.View.flashSuccess("Some Success Message #{event.timeStamp}")

  showErrorBanner: (event) ->
    DashBanner.View.flashError("Some Error Message #{event.timeStamp}")
