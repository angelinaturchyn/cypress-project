import LoginPage from "../pages/login.page";
import ProfilePage from "../pages/profile.page";


describe('Auth',function(){
    it('successful log in', function (){
        LoginPage.open()
        LoginPage.login('samsmith@gmail.com','Aa123123')
        ProfilePage.iconUser.should('be.visible')
        cy.visit('user/login')
        cy.get('[qa-id="email"]')
            .type('samsmith@gmail.com')
        cy.get('[qa-id="password"]')
            .type('Aa123123')
        cy.get('.login-form-button')
            .click()
        cy.get('img[alt="avatarIcon"]')
            .should('be.visible')
    })
})

describe('Orders', function() {
    it('Opens Orders', function(){
        cy.get('[href="/order"]').click()
        cy.get('[type="button"]')
          .parents('#root').find('[class="ant-btn ant-btn-primary"]')
          .should('contain', 'Create Order')

    })
})

describe('Creates an Order', function() {
    it('Creates an Order', function(){
        cy.get('[class="card card-body"]')
            .find('[class="ant-select-selection-search"]')
            .children('[name="FirstName"]')
            .type('Benjamin Button')
        cy.get('[type="submit"]').click()
    })
})

describe('Clients then and wrap m', function() {
    it('Opens Clients', function(){
        cy.get('[href="/client"]').click()
        cy.contains('Create Client').click()
        cy.get('[qa-id="firstName"]').type('Benjamin Franklin')
        cy.get('[class="d-flex justify-content-end"]').children('[type="submit"]').click()

    })
})

describe('First test',function() {
    it('successful log in', function () {
      cy.visit('/')
      cy.contains('Pricing').click()

    //By Tag Name
      cy.get('input')
    //By ID
      cy.get('#inputEmail')
     // By Class name
      cy.get('.input-full-width')
      //By Attribute name
      cy.get('[placeholder]')
        //By Attribute name and value
         cy.get('[placeholder="Email"]')
    })
})
