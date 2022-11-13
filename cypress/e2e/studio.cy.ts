

describe('Studio', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })


  it('passes', () => {
    cy.title().should('eq', 'Mimir')
    cy.wait(9000);

    /* ==== Generated with Cypress Studio ==== */

    // Click on a Post and navigate to the post page
    cy.get(':nth-child(1) > .p-3 > .py-4 > .text-lg').click();
    // wait for 1 second and check the url includes /post and a number
    cy.wait(3000);
    cy.url().should('match', /\/post\/\d+/);

    // Click on the Logo and navigate to the home page
    cy.get('.mimir-logo-main > span > .mimir-logo').click();
    cy.wait(1000);

    // Click on a Post and navigate to the post page
    cy.get(':nth-child(2) > .p-3 > .py-4 > .text-lg').click();
    cy.wait(3000);
    cy.url().should('match', /\/post\/\d+/);

    cy.get('.mimir-logo-main > span > .mimir-logo').click();
    cy.wait(1000);

    // Click on a View button for submimir and navigate to the submimir page
    cy.get(':nth-child(1) > .viewButton').click();
    cy.wait(3000);
    // check the url includes /submimir and a text
    cy.url().should('match', /\/subreddit\/\w+/);

    // Click on the Logo and navigate to the home page
    cy.get(':nth-child(1) > .p-3 > .py-4 > .text-lg').click();
    cy.wait(1000);


    cy.get('.mimir-logo-main > span > .mimir-logo').click();
    cy.wait(3000);
    cy.get(':nth-child(1) > .p-3 > .items-center > .text-xs > .font-semibold').click();
    cy.wait(3000);
    cy.get(':nth-child(1) > .p-3 > .py-4 > .text-lg').click();
    cy.wait(1000);
    cy.get('.mimir-logo-main > span > .mimir-logo').click();
    cy.wait(1000);
    /* ==== End Cypress Studio ==== */
  })
})


export {}