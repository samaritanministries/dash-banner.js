$ ->
  foo = new DashBanner.Foo()
  foo.render()
  $("[data-id=foo-container]").html(foo.el)
