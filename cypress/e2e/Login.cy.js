const { loginMethod } = require('../utilMethods/loginMethod.cy')

describe('Login function', function () {
    const testData = require('../fixtures/LoginPage.json')
    it('should login to the application', function () {  
        let scenario = testData[0]
        loginMethod(scenario)
        cy.log('Login test completed successfully.')
    })
})