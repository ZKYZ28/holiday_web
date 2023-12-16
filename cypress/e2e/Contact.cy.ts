import {} from 'cypress';
describe('Contact Page', () => {
  beforeEach(() => {
    //On doit augmenter le timeout à cause du SMTP de l'école qui est lent
    cy.timeout(10000);
  });

  it('should receive a 200 response when the form is submitted with valid data', () => {
    // Visiter la page de contact
    cy.visit('http://localhost:5173/#/contact');
    cy.intercept('POST', 'https://porthos-intra.cg.helmo.be/q210054/v1/mail').as('sendMail');

    // Remplir le formulaire avec des données valides
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('textarea[name="message"]').type('Ceci est un message de test.');

    // Soumettre le formulaire
    cy.get('form').submit();

    // Attendre la réponse de la requête
    cy.wait('@sendMail').then((interception) => {
      // Vérifier que la requête a été effectuée avec succès (statut 200)
      expect(interception.response.statusCode).to.equal(200);
    });
  });

  it('should show error message the form is submitted with invalid data', () => {
    // Visiter la page de contact
    cy.visit('http://localhost:5173/#/contact');

    // Remplir le formulaire avec des données invalides
    cy.get('input[name="email"]').type('john.doe@example');
    cy.get('textarea[name="message"]').type('Ceci est mon message');

    // Soumettre le formulaire
    cy.get('form').submit();

    // Vérifier que le message d'erreur s'affiche correctement
    cy.get('.text-red-600').should('be.visible');
  });
});
