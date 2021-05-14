describe('Basic page interactions', () => {
    beforeEach(() => {
        cy.visit('/example-4');
    });
    
    //** double click
    it('should set header text to item name on dbl click', () => {
        cy.get('[data-cy="box-1-items-list"] > :nth-child(2)')
            .dblclick();
        // ** check span text is expected
        cy.get('[data-cy="box-1-selected-name"]')
            .invoke('text')
            .should('equal','Option Two');
    });
    //** checkboxes
    it('should show number corresponding to number of checkboxes selected', () => {
        cy.get('[data-cy="box-2-checkboxes"] > label:nth-child(1) input')
            .check();
        cy.get('[data-cy="box-2-selected-count"]')
            .invoke('text')
            .should('equal','1');
        cy.get('[data-cy="box-2-checkboxes"] > label:nth-child(2) input')
            .check();
        cy.get('[data-cy="box-2-selected-count"]')
            .invoke('text')
            .should('equal','2');
        cy.get('[data-cy="box-2-checkboxes"] > label:nth-child(3) input')
            .check();
        cy.get('[data-cy="box-2-selected-count"]')
            .invoke('text')
            .should('equal','3');
        cy.get('[data-cy="box-2-checkboxes"] > label:nth-child(1) input')
            .uncheck();
        cy.get('[data-cy="box-2-checkboxes"] > label:nth-child(2) input')
            .uncheck();
        cy.get('[data-cy="box-2-checkboxes"] > label:nth-child(3) input')
            .uncheck();
        cy.get('[data-cy="box-2-selected-count"]')
            .invoke('text')
            .should('equal','0');
    });

    //** select dropdowns
    it('should display name of selected item', () => {
        cy.get('[data-cy="box-3-dropdown"]')
            .select('Option Three');
        cy.get('[data-cy="box-3-selected-name"]')
            .invoke('text')
            .should('equal', 'Option Three')
    });

    //** mousing
    it('should display the name of the most recently hovered item', () => {
        cy.get('[data-cy="box-4-items-list"] > :nth-child(2)')
            .trigger('mouseover');
        cy.get('[data-cy="box-4-selected-name"]')
            .invoke('text')
            .should('equal','Option Two');
    });
    
});