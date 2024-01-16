describe('authentication', () => {
  it('should show validation errors when leaving all fields blank', () => {
    cy.visit('http://localhost:3000/register')

    cy.get('[data-testid="submit"]').click()

    cy.get('[data-testid="register-error-first-name"]').should("exist")
    cy.get('[data-testid="register-error-last-name"]').should("exist")
    cy.get('[data-testid="register-error-email"]').should("exist")
    cy.get('[data-testid="register-error-password"]').should("exist")
    cy.get('[data-testid="register-error-acceptance"]').should("exist")
  })

  it('should redirect the user to the login page when filling the forms and clicking submit', () => {
    cy.visit('http://localhost:3000/register')

    cy.get('[data-testid="first-name-input"]').type("Ivan")
    cy.get('[data-testid="last-name-input"]').type("Ivanov")
    cy.get('[data-testid="email-input"]').type("ivan@mail.com")
    cy.get('[data-testid="password-input"]').type("Password1!")
    cy.get('[data-testid="confirm-password-input"]').type("Password1!")
    cy.get('[data-testid="acceptance-input"]').check()

    cy.get('[data-testid="submit"]').click()
    cy.url().should('match', /\/login$/)
  })

  it('should show validation errors when the inputs are invalid', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('[data-testid="login-submit"]').click()

    cy.get('[data-testid="login-error-email"]').should("exist")
    cy.get('[data-testid="login-error-password"]').should("exist")
  })

  it('should redirect the user to the home page when filling the forms and clicking submit', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('[data-testid="email-input"]').type("ivan@mail.com")
    cy.get('[data-testid="password-input"]').type("Password1!")

    cy.get('[data-testid="login-submit"]').click()
    cy.url().should('match', /\/home$/)
  })
})