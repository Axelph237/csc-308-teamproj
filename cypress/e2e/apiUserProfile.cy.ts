/*
Feature: API gets user information
Scenario: API is tasked to get the user's information
	Given the API was given correct credentials
	When the API uses 'GET' with these credentials
	Then a response of 200 is returned
 */

let authToken;

before(() => {
    cy.request('POST', 'http://localhost:5173/api/auth/login', {
        username: '123',
        password: '123'
    })
        .then((res) => {
        authToken = res.body.token;
    });
});

it('get user profile', () => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:5173/api/users/account',
        headers: {
            Authorization: `Bearer ${authToken}`
        }})
        .then((res) => {
        expect(res.status).to.eq(200);
    });
});
