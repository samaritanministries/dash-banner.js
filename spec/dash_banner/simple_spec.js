describe("Simple tests", () => {
  it("exists", () => {
    expect(1).toEqual(1)
  });

  it("has templates", () => {
    expect(DashBannerJST).toBeDefined()
    expect(DashBannerJST["scripts/dash_banner/foo_template.ejs"]().trim()).toEqual("Hello world")
  });
});
