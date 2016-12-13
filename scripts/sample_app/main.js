import ShowBannerView from "sample_app/show_banner_view.js"

(function() {
  $(function() {
    return new ShowBannerView({
      el: $("[data-id=show-banner]")
    });
  });

}).call(this);
