describe("External", () => {
  it("check scores", () => {
    cy.visit("https://anatomie.com/");
    cy.lighthouse();
  });
});