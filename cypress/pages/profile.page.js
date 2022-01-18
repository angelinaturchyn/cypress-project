import Page from "./page";

class ProfilePage extends Page{
    get iconUser() {return cy.get('img[alt="avatarIcon"]')}
}

export default new ProfilePage()