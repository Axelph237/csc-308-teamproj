/*
Feature: Create a Diary
Scenario: User goes to create a diary
	Given that the user wants to create a new diary
	When the user selects create diary
	Then a text box appears that allows them to name the diary

Scenario: User wants to save their diary
	Given that a user has named the new diary
	When a user presses the save icon
	Then the diary gets created and saved for future use
*/

describe('creating new diary', () => {
    it('can create a new diary', () => {
        cy.visit('http://localhost:5173/')

        cy.get('[data-testid="cypress-login-link"]').click()

        cy.get('[data-testid="cypress-usernameFormInput"]')
            .type('123')

        cy.get('[data-testid="cypress-passwordFormInput"]')
            .type('123')

        cy.get('[data-testid="cypress-loginButton"]')
            .click()

        cy.get('[data-testid="cypress-createDiary"]')
            .type("automated test diary")

        cy.get('[data-testid="cypress-saveDiaryButton"')
            .click()


    })
})