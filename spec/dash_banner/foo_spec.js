describe("foo", () => {
  it("exists", () => {
    expect(Foo).toEqual("Bar")
  });

  it("can find Underscore", () => {
    expect(doubled([1, 2, 3])).toEqual([2, 4, 6])
  });

  describe("Rendering the view", () => {
    it("works", () => {
      let view = new FooView()

      view.render()

      expect(view.$el.text()).toEqual("Hello World")
    });
  });
});
