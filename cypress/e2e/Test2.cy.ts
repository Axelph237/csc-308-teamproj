describe("login page", () => {
  it("renders correct elements", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-testid="cypress-login-link"]').click();

    cy.get('[data-testid="cypress-title"]')
      .should("exist")
      .should("have.text", "Login to your diaries");

    cy.get('[data-testid="cypress-usernameFormInput"]')
      .should("exist")
      .should("be.empty");

    cy.get('[data-testid="cypress-passwordFormInput"]')
      .should("exist")
      .should("be.empty");

    cy.get('[data-testid="cypress-loginButton"]')
      .should("exist")
      .should("have.text", "Login");
  });

  it("logs in successfully", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-testid="cypress-login-link"]').click();

    cy.get('[data-testid="cypress-usernameFormInput"]').type("testUser");

    cy.get('[data-testid="cypress-passwordFormInput"]').type("testPassword");

    cy.get('[data-testid="cypress-loginButton"]').click();
  });
});
