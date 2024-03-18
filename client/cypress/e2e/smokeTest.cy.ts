describe('Memory Mania Smoke Test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('renders the default elements on the landing page', () => {
        cy.get('[data-testid="cypress-main-title"]').should('exist').and('have.text', 'Memory Mania');
        cy.get('[data-testid="cypress-start-game-button"]').should('exist').and('have.text', 'Start Game');
        cy.get('[data-testid="cypress-instructions-button"]').should('exist').and('have.text', 'Instructions');
        cy.get('[data-testid="cypress-profile-button"]').should('exist').and('have.text', 'Profile');
    });

    it('navigates to the login page when start game button is clicked', () => {
        cy.get('[data-testid="cypress-start-game-button"]').click();
        cy.url().should('include', '/login');
    });

    it('logs in the user', () => {
        const username = 'user';
        cy.get('[data-testid="cypress-start-game-button"]').click();
        cy.get('#login-username-field').type(username).type('{enter}');
        // Don't wanna test password for now because its default value is correct and doesn't need to change.
        // cy.get('#login-password-field').type(`password`);
        cy.url().should('eq', 'http://localhost:5173/');
        cy.contains(`Successfully logged in as ${username}`);
    });

    it('logs in the user and caches auth state', () => {
        const username = 'user';
        cy.get('[data-testid="cypress-start-game-button"]').click();
        cy.get('#login-username-field').type(username).type('{enter}');
        cy.url().should('eq', 'http://localhost:5173/');
        cy.contains(`Successfully logged in as ${username}`);
        // After logging in once, auth token should be saved and a browser reload should not ask to log in again.
        cy.reload();
        cy.get('[data-testid="cypress-start-game-button"]').click();
        cy.get('[data-testid="cypress-user-card"]').should('have.length', 3);
    });

    it('starts game after logging in', () => {
        // Login
        const username = 'user';
        cy.get('[data-testid="cypress-start-game-button"]').click();
        cy.get('#login-username-field').type(username).type('{enter}');
        cy.url().should('eq', 'http://localhost:5173/');
        cy.contains(`Successfully logged in as ${username}`);

        // Start game (learning phase)
        cy.get('[data-testid="cypress-start-game-button"]').click();
        cy.get('[data-testid="cypress-user-card"]').should('have.length', 3);
        cy.get('[data-testid="cypress-timer"]').should('exist');
        cy.get('[data-testid="cypress-test-button"]').should('exist').and('have.text', 'Test');

        // Waiting phase
        cy.get('[data-testid="cypress-test-button"]').click();
        cy.get('[data-testid="cypress-test-countdown-container"]').should('exist');
        cy.get('[data-testid="cypress-skip-button"]').click();

        // Testing phase
        cy.get('[data-testid="cypress-user-card"]').should('have.length', 3);
    });

    it.only('goes to the next level', () => {
        // Login
        const username = 'user';
        cy.get('[data-testid="cypress-start-game-button"]').click();
        cy.get('#login-username-field').type(username).type('{enter}');

        // Spying and response stubbing.
        // Note: The order of the faces can be different since its shuffled.
        // So i will give them all the same name so i can 'force' all correct answers.
        cy.intercept('GET', 'https://randomuser.me/api/*', {
            results: [
                { id: { value: '1' }, name: { first: 'A' }, picture: { large: 'PersonA.png' } },
                { id: { value: '2' }, name: { first: 'A' }, picture: { large: 'PersonB.png' } },
                { id: { value: '3' }, name: { first: 'A' }, picture: { large: 'PersonC.jpeg' } },
                { id: { value: '4' }, name: { first: 'A' }, picture: { large: 'PersonD.png' } },
                { id: { value: '5' }, name: { first: 'A' }, picture: { large: 'PersonE.jpeg' } },
                { id: { value: '6' }, name: { first: 'A' }, picture: { large: 'PersonF.png' } }
            ]
        }).as('randomUserRequest');

        // Start game (learning phase)
        cy.get('[data-testid="cypress-start-game-button"]').click();
        cy.get('[data-testid="cypress-test-button"]').click();
        cy.get('[data-testid="cypress-skip-button"]').click();

        // Testing phase
        // Index 0 = 'Select a name'
        cy.get('[data-testid="cypress-user-card"]').eq(0).find('select').select(1);
        cy.get('[data-testid="cypress-user-card"]').eq(1).find('select').select(1);
        cy.get('[data-testid="cypress-user-card"]').eq(2).find('select').select(1);

        cy.get('[data-testid="cypress-finish-test-button"]').click();
        cy.get('[data-testid="cypress-score-text"]').should('have.text', '3 / 3');

        cy.get('[data-testid="cypress-user-card"]').eq(0).find('select').should('be.disabled');
        cy.get('[data-testid="cypress-user-card"]').eq(1).find('select').should('be.disabled');
        cy.get('[data-testid="cypress-user-card"]').eq(2).find('select').should('be.disabled');

        cy.get('[data-testid="cypress-next-level-button"]').should('exist').and('have.text', 'Next Level').click();

        cy.get('[data-testid="cypress-level-info"]').should('have.text', 'Level 2');
    });
});
