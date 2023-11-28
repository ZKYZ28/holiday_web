describe('Login Page', () => {
  it('should not redirect when login form is submitted with empty fields', () => {
    // Visiter la page de connexion
    cy.visit('http://localhost:5173/#/login');

    // Trouver le formulaire de connexion
    cy.get('form').submit();

    // Vérifier que l'utilisateur n'est pas redirigé
    cy.url().should('include', 'http://localhost:5173/#/login');

    cy.log('Intercepting POST request to login endpoint');
    cy.intercept('POST', 'https://localhost:7048/v1/authentification/login').as('loginRequest');

    // Attendre que la requête soit interceptée
    cy.wait('@loginRequest').then((interception) => {

      // Vérifier que la requête a été effectuée (response n'est pas undefined)
      expect(interception.response).to.not.be.undefined;

      // Vérifier que le code d'état de la réponse est 400
      expect(interception.response.statusCode).to.equal(400);
    });
  });
});
