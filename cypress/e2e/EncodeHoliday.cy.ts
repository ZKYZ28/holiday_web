describe('EncodeHoliday Page', () => {
  it('should create a new holiday', () => {
    // Visiter la page de connexion
    cy.visit('http://localhost:5173/#/login');

    // Remplir le formulaire de connexion et soumettre
    cy.get('input[name="email"]').type('Francis@gmail.com');
    cy.get('input[name="password"]').type('Passw0rd!');
    cy.get('form').submit();

    // Attendre que la connexion réussisse
    cy.url().should('include', 'http://localhost:5173/#/holidays');

    // Cliquez sur le lien NavLink "Encoder"
    cy.get('a')
      .eq(3)
      .click()

    // Attendre que la page d'encodage soit chargée
    cy.url().should('include', 'http://localhost:5173/#/holidays/holiday');

    cy.intercept('POST', 'https://localhost:7048/v1/holiday').as('encodeHoliday');

    // Remplir et soumettre le formulaire d'encodage de vacances
    cy.get('input[name="name"]').type('Nom de la vacances');
    cy.get('input[name="country"]').type('Belgique');
    cy.get('input[name="number"]').type('10');
    cy.get('input[name="street"]').type('Rue J.F. Kennedy');
    cy.get('input[name="postalCode"]').type('4000');
    cy.get('input[name="locality"]').type('Liège');
    cy.get('input[name="startDate"]').type('2024-02-15');
    cy.get('input[name="endDate"]').type('2024-02-25');
    cy.get('textarea[name="description"]').type('Description de la vacance');

    // Soumettre le formulaire
    cy.get('form').submit();

    cy.url().should('include', 'http://localhost:5173/#/holidays');

    // Attendre que la requête soit interceptée
    cy.wait('@encodeHoliday').then((interception) => {
      // Vérifier que la requête a été effectuée (response n'est pas undefined)
      expect(interception.response).to.not.be.undefined;

      // Vérifier que le code d'état de la réponse est 200
      expect(interception.response.statusCode).to.equal(200);
    });
  });
});
