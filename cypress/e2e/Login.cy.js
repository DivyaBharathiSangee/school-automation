const { loginMethod } = require('../utilMethods/loginMethod.cy')

describe('Login function', function () {
    const testData = require('../fixtures/LoginPage.json')
    it('should login to the application', function () {  
        let scenario = testData[0]
        loginMethod(scenario)
        //cy.visit('https://smartschoolnxt.co.in/')
        //cy.get('#username').type('testuser')
       // cy.get('#password').type('password123')
        //cy.get('#loginButton').click()
        //cy.url().should('include', '/dashboard')
        cy.log('Login test completed successfully.')
    })
})