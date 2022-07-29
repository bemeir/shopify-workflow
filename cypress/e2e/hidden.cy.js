describe("Hidden", () => {
    it("Check hidden", () => {
        cy.visit("https://anatomie.com/");
        cy.get('#dropdown').should('not.be.visible');
    });
});