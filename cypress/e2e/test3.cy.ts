describe("create profile page", () => {
  it("renders correct elements", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-testid="cypress-createProfile-link"]').click();

    cy.get('[data-testid="cypress-title"]')
      .should("exist")
      .should("have.text", "Create Profile");

    cy.get('[data-testid="cypress-usernameForm"]')
      .should("exist")
      .should("be.empty");

    cy.get('[data-testid="cypress-emailForm"]')
      .should("exist")
      .should("be.empty");

    cy.get('[data-testid="cypress-passwordForm1"]')
      .should("exist")
      .should("be.empty");

    cy.get('[data-testid="cypress-passwordForm2"]')
      .should("exist")
      .should("be.empty");

    cy.get('[data-testid="cypress-createProfile-button"]')
      .should("exist")
      .should("have.text", "Create Profile");
  });
});
