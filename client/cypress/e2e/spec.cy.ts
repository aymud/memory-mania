describe('Memory Mania', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('renders the default elements on the screen', () => {
        cy.get('[data-testid="cypress-main-title"]').should('exist').and('have.text', 'Memory Mania');
        cy.get('[data-testid="cypress-start-game-button"]').should('exist').and('have.text', 'Start Game');
        cy.get('[data-testid="cypress-instructions-button"]').should('exist').and('have.text', 'Instructions');
        cy.get('[data-testid="cypress-profile-button"]').should('exist').and('have.text', 'Profile');
    });
});
