// Exemple de test Cypress pour récupérer le token après une connexion
describe('Login Page', () => {
  it('should retrieve the access token after login', () => {
    // Visiter la page de connexion
    cy.visit('http://localhost:5173/#/login');

    // Remplir le formulaire de connexion et soumettre
    cy.get('input[name="email"]').type('Francis@gmail.com');
    cy.get('input[name="password"]').type('Passw0rd!');
    cy.get('form').submit();

    // Attendre que la connexion réussisse
    cy.url().should('include', 'http://localhost:5173/#/holidays');

    // Récupérer le token depuis le localStorage
    cy.window().its('localStorage').invoke('getItem', 'token').then((token) => {
      cy.log('Access Token:', token);
    });

  });
});
