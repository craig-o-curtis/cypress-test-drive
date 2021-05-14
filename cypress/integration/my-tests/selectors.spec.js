describe('Input Text with max chars', () => {
    it('should display appropriate remaining char count', () => {
        cy.visit('http://localhost:3000/example-3');
        // check span with chars remaining

        // // UNSAFE 1 - select html
        // cy.get('span')
        // // UNSAFE 2 - select html array
        // cy.get('span').eq(1)
        // // UNSAFE 3 - select cSS class
        // cy.get('span.my-class')
        // // UNSAFE 4 - select cSS id
        // cy.get('span#my-id')
        // // UNSAFE 5 - select by text contains
        // cy.contains('Submit')
        //** RECOMMENDED - data attributes data-cy 
        //** <span data-cy="chars-left-count">
        cy.get("[data-cy='last-name-chars-left-count']")
            .invoke('text')
            .should('equal', '15');
        // Cypress types text
        cy.get("[data-cy='input-last-name']").type('hello');
        // Check span again
        cy.get("[data-cy='last-name-chars-left-count']")
            .invoke('text')
            .should('equal', '10');
        // type remaining letters
        cy.get("[data-cy='input-last-name']").type(' my friend');
        // Check span again
        cy.get("[data-cy='last-name-chars-left-count']")
            .invoke('text')
            .should('equal', '0');
    });

    it('should prevent user from typing more than 15 chars', () => {
        cy.visit('http://localhost:3000/example-3');
        cy.get("[data-cy='input-last-name']").type('Hello my friend I am more than 15 chars');
        cy.get("[data-cy='last-name-chars-left-count']")
            .invoke('text')
            .should('equal','0');
        cy.get("[data-cy='input-last-name']")
            .should('have.attr','value', 'Hello my friend');
    });
});