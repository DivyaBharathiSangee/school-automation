class LoginPageobject{
    username(){
        return cy.get('[name="loginId"]')
    }
    clickNext()
    {
        return cy.get('.position-relative > div > .btn > .bi')
    }
    password()
    {
        return cy.get('[name="password"]')
    }
    signin()
    {
        return cy.get('.col-xl-5 > .btn')
    }
}
export default LoginPageobject