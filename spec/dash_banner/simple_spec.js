describe("Simple tests", () => {
  it("exists", () => {
    expect(1).toEqual(1)
  });

  it("has templates", () => {
    expect(DashBannerJST).toBeDefined()
    expect(DashBannerJST["scripts/dash_banner/action_template.ejs"]).toBeDefined()
  });
});
