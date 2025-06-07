/*
Feature: User log in
Scenario: A user is logging in using valid credentials
	Given the user has already created an account
	When the user types in their credentials
	And presses the login button
	Then they are brought to their home page
	And can see all the diaries they have stored
 */

describe("user log in", () => {
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

    cy.get('[data-testid="cypress-usernameFormInput"]').type("123");

    cy.get('[data-testid="cypress-passwordFormInput"]').type("123");

    cy.get('[data-testid="cypress-loginButton"]').click();

    cy.get('[data-testid="cypress-title"]')
        .should("exist");
  });
});
