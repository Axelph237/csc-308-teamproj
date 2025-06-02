describe('landing page', () => {
  it('renders the correct title', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-testid="cypress-title"]')
        .should('exist')
        .should('have.text', 'Welcome to Diary');
  })

  it('renders the correct linking buttons', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-testid="cypress-login-link"]')
        .should('exist')
        .should('have.text', 'Login');

    cy.get('[data-testid="cypress-createProfile-link"]')
        .should('exist')
        .should('have.text', 'Create Profile');
  })
})