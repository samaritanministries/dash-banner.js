import Backbone from "backbone"

export default class extends Backbone.View {

  events() {
    return {
      "click [data-id=flash-success-banner]": "flashSuccessBanner",
      "click [data-id=flash-error-banner]": "flashErrorBanner",
      "click [data-id=flash-action-banner]": "flashActionBanner",
      "click [data-id=show-success-banner]": "showSuccessBanner",
      "click [data-id=show-error-banner]": "showErrorBanner",
      "click [data-id=show-action-banner]": "showActionBanner",
      "click [data-id=close-banner]": "closeBanner"
    }
  }

  flashSuccessBanner(event) {
    DashBanner.View.flashSuccess(`Some Success Message ${event.timeStamp}`)
  }

  flashErrorBanner(event) {
    DashBanner.View.flashError(`Some Error Message ${event.timeStamp}`)
  }

  flashActionBanner(event) {
    DashBanner.View.flashAction(`Some Action Message ${event.timeStamp}`)
  }

  showSuccessBanner(event) {
    DashBanner.View.showSuccess(`Some Success Message ${event.timeStamp}`)
  }

  showErrorBanner(event) {
    DashBanner.View.showError(`Some Error Message ${event.timeStamp}`)
  }

  showActionBanner(event) {
    DashBanner.View.showAction(`Some Action Message ${event.timeStamp}`)
  }

  closeBanner() {
    DashBanner.View.closeBanner()
  }

}
