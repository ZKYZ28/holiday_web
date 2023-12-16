describe('HomePage', () => {
  it('should receive a 200 response when the form is submitted', () => {
    // Visitez la page
    cy.visit('http://localhost:5173/#/');

    // Interceptez la requête associée à la soumission du formulaire
    cy.intercept('GET', 'https://porthos-intra.cg.helmo.be/q210054/v1/statistics/date/2023-12-28').as('formSubmission');

    // Simulez la saisie d'une date dans le champ de formulaire
    cy.get('#date').type('2023-12-28'); // Remplacez par une date appropriée

    // Simulez le clic sur le bouton de recherche
    cy.get('button').click();

    // Attendre la fin de la requête interceptée
    cy.wait('@formSubmission').then((interception) => {
      // Vérifiez que la requête a été effectuée (response n'est pas undefined)
      expect(interception.response).to.not.be.undefined;

      // Vérifiez que le code d'état de la réponse est 200
      expect(interception.response.statusCode).to.equal(200);
    });
  });
});
