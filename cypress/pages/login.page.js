import Page from './page'

class LoginPage extends Page {
    get inputUsername() {return cy.get('[qa-id="email"]')}
    get inputPassword() {return cy.get('[qa-id="password"]')}
    get buttonSubmit() {return cy.get('.login-form-button')}

    open() {
        super.open('/user/login')
    }
    login(username, password) {
      this.inputUsername.type(username)
      this.inputPassword.type(password)
      this.buttonSubmit.click()
    }
}

export default new LoginPage()