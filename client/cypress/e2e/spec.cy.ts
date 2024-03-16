describe('template spec', () => {
    it('passes', () => {
        cy.visit('/');

        cy.get('[data-testid="cypress-main-title]"').should('exist');
    });
});
