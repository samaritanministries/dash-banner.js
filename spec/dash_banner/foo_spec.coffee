# FooBar = Foo.Bar
require("dash_banner/foo.coffee")

describe "Foo.Bar", ->

  it "does something", ->
    expect(new Foo.Bar().bar()).toEqual("Hello world")
