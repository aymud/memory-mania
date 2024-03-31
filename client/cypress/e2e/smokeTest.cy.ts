describe('Memory Mania Smoke Test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('renders the default elements on the landing page', () => {
        cy.get('[data-testid="cypress-main-title"]').should('exist').and('have.text', 'Memory Mania');
        cy.get('[data-testid="cypress-start-game-button"]').should('exist').and('have.text', 'Start Game');
        cy.get('[data-testid="cypress-instructions-button"]').should('exist').and('have.text', 'Instructions');
    });

    it('navigates to the login page when start game button is clicked', () => {
        cy.get('[data-testid="cypress-start-game-button"]').click();
        cy.url().should('include', '/login');
    });

    it('logs in the user and logs out', () => {
        const username = 'user';
        cy.get('[data-testid="cypress-start-game-button"]').click();
        cy.get('#login-username-field').type(username).type('{enter}');
        // Don't want to test password for now because its default value is correct and doesn't need to change.
        // cy.get('#login-password-field').type(`password`);
        cy.url().should('eq', 'http://localhost:5173/');
        cy.contains(`Successfully logged in as ${username}`);

        // logout
        cy.get('[data-testid="cypress-navbar-menu-dropdown"]').click({ force: true });
        cy.get('[data-testid="cypress-navbar-menu"]').should('be.visible');
        cy.get('[data-testid="cypress-logout-button"]').click({ force: true });
        cy.get('[data-testid="cypress-navbar-menu"]').should('not.exist');
    });

    it('goes to profile', () => {
        const username = 'user';
        cy.get('[data-testid="cypress-start-game-button"]').click();
        cy.get('#login-username-field').type(username).type('{enter}');
        // Don't want to test password for now because its default value is correct and doesn't need to change.
        // cy.get('#login-password-field').type(`password`);
        cy.url().should('eq', 'http://localhost:5173/');
        cy.contains(`Successfully logged in as ${username}`);

        // profile
        cy.get('[data-testid="cypress-navbar-menu-dropdown"]').click({ force: true });
        cy.get('[data-testid="cypress-navbar-menu"]').should('be.visible');
        cy.get('[data-testid="cypress-profile-button"]').click({ force: true });
        cy.get('[data-testid="cypress-profile-container"]').should('be.visible');
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

    it('goes to the next level', () => {
        // Login
        const username = 'user';
        cy.get('[data-testid="cypress-start-game-button"]').click();
        cy.get('#login-username-field').type(username).type('{enter}');

        // Spying and response stubbing.
        // Note: The order of the faces can be different since its shuffled.
        // So I will give them all the same name, so I can 'force' all correct answers.
        cy.intercept('GET', 'https://randomuser.me/api/*', { fixture: 'users.json' }).as('randomUserRequest');

        // // Start game (learning phase)
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

    it('drags the cards', () => {
        // Login
        const username = 'user';
        cy.get('[data-testid="cypress-start-game-button"]').click();
        cy.get('#login-username-field').type(username).type('{enter}');

        // Spying and response stubbing.
        cy.intercept('GET', 'https://randomuser.me/api/*', {
            results: [
                { id: { value: '1' }, name: { first: 'John' }, picture: { large: 'PersonA.png' } },
                { id: { value: '2' }, name: { first: 'Jane' }, picture: { large: 'PersonB.png' } },
                { id: { value: '3' }, name: { first: 'Play' }, picture: { large: 'PersonC.jpeg' } }
            ]
        }).as('randomUserRequest');

        // Start game (learning phase)
        cy.get('[data-testid="cypress-start-game-button"]').click();
        cy.get('[data-testid="cypress-user-card"]').should('have.length', 3);

        // Check order before the drag
        const cardsBeforeDrag = [
            { name: 'John', id: 0 },
            { name: 'Jane', id: 1 },
            { name: 'Play', id: 2 }
        ];
        cy.get('[data-testid="cypress-user-card"]').each(($card, index) => {
            cy.wrap($card).should('contain.text', cardsBeforeDrag[index].name);
        });

        // Perform drag
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        cy.get('#2').drag('#1', {
            force: true,
            target: { position: 'right' },
            waitForAnimations: true
        });
        // Check order after the drag
        const cardsAfterDrag = [
            { name: 'Jane', id: 1 },
            { name: 'John', id: 0 },
            { name: 'Play', id: 2 }
        ];
        // It's important cardsAfterDrag is the one being iterated because the ui
        // will contain an extra card with an opacity of 0 for a moment.
        cardsAfterDrag.forEach((card, index) => {
            cy.get('[data-testid="cypress-user-card"]').eq(index).should('contain.text', card.name);
        });
    });
});
