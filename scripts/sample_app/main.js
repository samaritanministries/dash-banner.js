import ShowBannerView from "sample_app/show_banner_view.js"

$(() => {
  return new ShowBannerView({
    el: $("[data-id=show-banner]")
  });
});
