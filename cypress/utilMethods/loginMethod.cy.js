import LoginPageObject from '../pageObjects/loginPageObject.cy.js'


const login = new LoginPageObject()

export function loginMethod(scenario) {
  cy.visit('https://smartschoolnxt.co.in/')
  login.username().type(scenario.username)
  login.clickNext().click()
  login.password().type(scenario.password)
  login.signin().click()
}
