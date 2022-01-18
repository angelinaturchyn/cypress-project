import LoginPage from "../pages/login.page";
import ProfilePage from "../pages/profile.page";

describe('Auth',function(){
    it('successful log in', function (){
        LoginPage.open()
        LoginPage.login('samsmith@gmail.com','Aa123123')
        ProfilePage.iconUser.should('be.visible')
        // cy.visit('user/login')
        // cy.get('[qa-id="email"]')
        //     .type('samsmith@gmail.com')
        // cy.get('[qa-id="password"]')
        //     .type('Aa123123')
        // cy.get('.login-form-button')
        //     .click()
        // cy.get('img[alt="avatarIcon"]')
        //     .should('be.visible')
    })
})