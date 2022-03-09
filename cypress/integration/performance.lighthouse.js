import 'cypress-audit/commands'


describe('Lighthouse perfomance test', function () {
    beforeEach('open', () => {
        cy.visit("http://localhost:4200")
    });

    it('should run performance audits',()=>{
        cy.lighthouse()
    });

    it.only('should run performance audits under custom specs',()=>{
        cy.lighthouse({
            accessibility: 80,
            performance: 33,
            seo: 91
        })
    })


});

