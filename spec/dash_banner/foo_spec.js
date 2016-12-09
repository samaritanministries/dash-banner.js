describe("foo", () => {
  it("exists", () => {
    expect(Foo).toEqual("Bar")
  });

  it("can find Underscore", () => {
    expect(doubled([1, 2, 3])).toEqual([2, 4, 6])
  });
});
