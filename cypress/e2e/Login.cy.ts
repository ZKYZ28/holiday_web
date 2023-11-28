// Exemple de test Cypress pour récupérer le token après une connexion
describe('Login Page', () => {
  it('should retrieve the access token after login', () => {
    // Visiter la page de connexion
    cy.visit('http://localhost:5173/#/login');
    cy.intercept('GET', 'https://localhost:7048/v1/holiday/participant/3b8ab47b-860f-459e-8dcc-5828f7d5fabc').as('getHolidaysBYParticipant');

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

    cy.wait('@getHolidaysBYParticipant').then((interception) => {
      expect(interception.response).to.not.be.undefined;

      // Vérifier que le code d'état de la réponse est 400
      expect(interception.response.statusCode).to.equal(200);
    });
  });

  it('should not redirect when login form is submitted with empty fields', () => {
    // Visiter la page de connexion
    cy.visit('http://localhost:5173/#/login');
    cy.intercept('POST', 'https://localhost:7048/v1/authentification/login').as('loginRequest');

    // Trouver le formulaire de connexion
    cy.get('form').submit();

    // Vérifier que l'utilisateur n'est pas redirigé
    cy.url().should('include', 'http://localhost:5173/#/login');

    // Attendre que la requête soit interceptée
    cy.wait('@loginRequest').then((interception) => {

      // Vérifier que la requête a été effectuée (response n'est pas undefined)
      expect(interception.response).to.not.be.undefined;

      // Vérifier que le code d'état de la réponse est 400
      expect(interception.response.statusCode).to.equal(400);
    });
  });
});
