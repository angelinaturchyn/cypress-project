describe('Invoke cmd', () => {

    beforeEach('open', () => {
        cy.visit("http://localhost:4200")
    })

    it('First cmd', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.contains('nb-card', 'Basic form').find('nb-checkbox').click().find('.custom-checkbox')
            .invoke('attr', 'class').then(label => {
            expect(label).to.contain('checked')
        })
        // cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
        //
        // cy.get('[for="exampleInputEmail1"]').then( label => {
        //     expect(label.text()).to.eq('Email address')
        // })
    })

    it('Should verify arr exists and contains 7 el', () => {
        cy.get('[class="menu-items"]').each((el) => {
            cy.wrap(el).children().should('have.length', 7)
        })

    })

    it('Should verify length and text of all menu link items', () => {
        const menuItems = [
            "FEATURES",
            "Layout",
            "Forms",
            "Modal & Overlays",
            "Extra Components",
            "Tables & Data",
            "Auth"
        ];
        cy.get('[class="menu-items"]').each((item,index,list)=> {
         cy.wrap(item).children().should('contain.text', menuItems[index])
        })
    })

    it('Verify links',()=>{
      cy.get('[icon="menu-2-outline"]').click()
       cy.get('[class="menu-item ng-tns-c7-1 ng-star-inserted"]').each((el)=>{
           cy.wrap(el).children().should('have.attr','href')
       })
    })

    it('Toastr',()=>{
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('nb-checkbox').find('[type="checkbox"]').then(checkBox=>{
            cy.wrap(checkBox).eq(0).should('be.checked')
            cy.wrap(checkBox).eq(1).should('not.be.checked')
        })

    })

    it('Verify links',()=>{
        cy.get('[icon="menu-2-outline"]').click()
        cy.get('[class="menu-items"]').then((el)=>{
            cy.wrap(el).children().eq(1).then(layout =>{
                cy.wrap(layout).children().should('have.attr','href')
            })
        })
    })

    it.only('assert btn',() => {
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[class="col-md-6 col-sm-12"]').children('[class="form-group"]')
            .find('[ng-reflect-selected="primary"]').then(primaryButton=>{
            cy.wrap(primaryButton)
                .should('have.attr', 'class')
                //.should('contain.text', 'primary')
        })
    })


})

