describe('Input Text with max chars', () => {
    it('should display appropriate remaining char count', () => {
        cy.visit('http://localhost:3000/example-2');
        // check span with chars remaining
        cy.get('span')
            .invoke('text')
            .should('equal', '15');
        // Cypress types text
        cy.get('input').type('hello');
        // Check span again
        cy.get('span')
            .invoke('text')
            .should('equal', '10');
        // type remaining letters
        cy.get('input').type(' my friend');
        // Check span again
        cy.get('span')
            .invoke('text')
            .should('equal', '0');
    });

    it('should prevent user from typing more than 15 chars', () => {
        cy.visit('http://localhost:3000/example-2');
        cy.get('input').type('Hello my friend I am more than 15 chars');
        cy.get('span')
            .invoke('text')
            .should('equal','0');
        cy.get('input')
            .should('have.attr','value', 'Hello my friend+');
    });
});