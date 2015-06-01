describe "Foo", ->

  it "exists", ->
    foo = new DashBanner.Foo()
    foo.render()
    expect(foo.$("[data-id=foo]")).toExist()
