/*
Feature: API logs in user
Scenario: User is logging in
	Given that the user logs in with valid credentials
	When the user enters their login information and clicks login
	Then the API is called with post

Scenario: Login API is called
	Given that the API is called with valid credentials
	When the API posts the username and password
	Then a response of 200 is returned
 */

describe('API login', () => {
    it('should log in successfully', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:5173/api/auth/login',
            body: {
                username: '123',
                password: '123'
            }})
            .then((response) => {
            expect(response.status).to.eq(200);
        });
    });
});
