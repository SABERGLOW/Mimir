/// reference types="cypress" />

// make a cypress test which visits localhost:3000 and checks if the title is "Next.js + Cypress"
// Path: cypress\e2e\home.cy.ts
/// reference types="cypress" />

describe('Home Page', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.title().should('eq', 'Mimir')
  })
})


export {}