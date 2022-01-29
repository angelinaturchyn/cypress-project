it.only('Datepicker', () => {
    function selectDayFromCurrent(day){
        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleString('default',{month: 'short'})
        let dateAssert = futureMonth + ' '+ futureDay + ', ' + date.getFullYear()
        cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then( dateAttribute =>{
            if(!dateAttribute.includes(futureMonth)){
                cy.get('[data-name="chevron-right"]').click()
                selectDayFromCurrent(day)
            }else{
                cy.get('nb-calendar-day-picker [class="ng-star-inserted"]').contains(futureDay).click()
            }
        })
        return dateAssert
    }

    cy.visit("http://localhost:4200")
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input =>{
        cy.wrap(input).click({force: true})
        let dateAssert = selectDayFromCurrent(1)

        cy.wrap(input).invoke('prop', 'value').should('contain',dateAssert)
    })
})


it.only('Tooltips', () => {
    cy.visit("http://localhost:4200")
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()
    cy.contains('nb-card','Colored Tooltips')
    cy.get('[icon="menu-2-outline"]').click()
        cy.contains('Default').click({force: true})
    cy.get('nb-tooltip').should('contain','This is a tooltip')


})
it.only('Dialog box', () => {
    cy.visit("http://localhost:4200")
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    cy.get('[icon="menu-2-outline"]').click()
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm',(confirm)=>{
        expect(confirm).to.equal('Are you sure you want to delete?')
        cy.wrap(confirm).click()
    })
})
it.only('dialog box',()=>{
    cy.visit("http://localhost:4200")
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()


    cy.get('[icon="menu-2-outline"]').click()
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm',(confirm)=> {
        expect(confirm).to.equal('Are you sure you want to delete?')
        cy.wrap(confirm).click()

        const stub = cy.stub()
        cy.on('window:confirm',stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect((stub.getCall(0))).to.be.calledWith('Are you sure you want to delete?')
        })
    })
    cy.get('tbody tr').first().find('.nb-trash').click()
     cy.on('window:confirm',(confirm)=> false)

})







it.only('Radio button', () =>{
    cy.visit("http://localhost:4200")
    cy.contains('Forms').click()
    cy.contains('Form Layout').click()

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons =>{
        cy.wrap(radioButtons)
            .first()
            .check({force: true})
            .should('be.checked')

        cy.wrap(radioButtons)
            .eq(1)
            .check({force: true})

        cy.wrap(radioButtons)
            .first()
            .should('not.be.checked')

        cy.wrap(radioButtons)
            .eq(2)
            .should('be.disabled')


    })
})

it.only('Check boxes', () =>{
    cy.visit("http://localhost:4200")
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    // cy.get('[type="checkbox"]').eq(1).should('not.be.checked')
     cy.get('[type="checkbox"]').eq(1).check({force:true})
     cy.get('[type="checkbox"]').eq(0).click({force:true})

})

it.only('lists and dropdowns', () => {
    cy.visit("http://localhost:4200")

    cy.get('nav nb-select').click()
    cy.get('.options-list').contains('Cosmic').click()
    cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(50, 50, 89)')

    cy.get('nav nb-select').then(dropdown =>{
        cy.wrap(dropdown).click()
        cy.get('.options-list-container nb-option').each((listItem ,index) =>
        {
            const itemText = listItem.text().trim()

            const colors = {
                "Light": "rgb(255, 255, 255)",
                "Dark": "rgb(34, 43, 69)",
                "Cosmic": "rgb(50, 50, 89)",
                "Corporate": "rgb(255, 255, 255)"
            }

            cy.wrap(listItem).click()
            cy.wrap(dropdown).should('contain', itemText)
            cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
            if (index < 3) {
                cy.wrap(dropdown).click()
            }
        })
    })
})

it.only('Web tables', () => {
    cy.visit("http://localhost:4200")
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    cy.get('tbody').contains('tr','Larry').then(tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click({force: true})
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
        cy.wrap(tableRow).find('.nb-checkmark').click({force: true})
        cy.wrap(tableRow).find('td').eq(6).should('contain','25')
    })

    cy.get('thead').find('.nb-plus').click({force: true})
    cy.get('thead').find('tr').eq(2).then(tableRow => {
       cy.wrap(tableRow).find('[placeholder="First Name"]').type('Angelina')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Turchyn')
        cy.wrap(tableRow).find('.nb-checkmark').click({force: true})
    })

    cy.get('tbody tr').first().find('td').then( tableColumns => {
        cy.wrap(tableColumns).eq(2).should('contain', 'Angelina')
        cy.wrap(tableColumns).eq(3).should('contain', 'Turchyn')
    })

    const age = [20, 30, 40, 200]

    cy.wrap(age).each( age => {
        cy.get('thead [placeholder="Age"]').clear().type(age)
        cy.wait(500)
        cy.get('tbody tr').each( tableRow => {
            cy.wait(500)
            if(age === 200){
                cy.wrap(tableRow).should('contain', 'No data found' )
            }else{
                cy.wrap(tableRow).find('td').eq(6).should('contain', age)
            }
        })
    })

})