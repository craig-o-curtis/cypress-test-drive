describe('Input Text with max chars', () => {
    it('should display appropriate remaining char count', () => {
        cy.visit('/example-3');

        // ** Aliasing
        cy.get("[data-cy='last-name-chars-left-count']")
            .as('charsLeftSpan');
        cy.get("[data-cy='input-last-name']")
            .as('lastNameInput')
        
        // ** working with results
        cy.get('@charsLeftSpan').then($charsLeftSpan => {
            //** $charsLeftSpan is DOM element; not a promise */
            // ** Use Chai expect, jQuery **/
            expect($charsLeftSpan.text()).to.equal('15');
        });
        // ** same as
        // cy.get('@charsLeftSpan')
        //     .invoke('text')
        //     .should('equal', '15');

        cy.get('@lastNameInput').type('hello');
        cy.get('@charsLeftSpan')
            .invoke('text')
            .should('equal', '10');
        cy.get('@lastNameInput').type(' my friend');
        cy.get('@charsLeftSpan')
            .invoke('text')
            .should('equal', '0');
    });

    it('should prevent user from typing more than 15 chars', () => {
        cy.visit('/example-3');

        cy.get("[data-cy='last-name-chars-left-count']")
            .as('charsLeftSpan');
        cy.get("[data-cy='input-last-name']")
            .as('lastNameInput')

        cy.get('@lastNameInput').type('Hello my friend I am more than 15 chars');
        cy.get('@charsLeftSpan')
            .invoke('text')
            .should('equal','0');
        cy.get('@lastNameInput')
            .should('have.attr','value', 'Hello my friend');
    });
});