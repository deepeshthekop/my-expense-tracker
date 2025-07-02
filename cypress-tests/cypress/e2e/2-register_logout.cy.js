describe('register and sign out', () => {
  it('verifies user registration and logout', () => {
    const timestamp = Date.now();
    const name = `test-${timestamp}`;
    const email = `test+${timestamp}@xyz.com`;
    const password = 'Test@123';

    cy.visit('https://my-expense-tracker-beta.vercel.app/')
    cy.contains('Expense Tracker')
    cy.contains('Sign Up').click()
    cy.contains('Create an account')
    cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-reset').type(name)
    cy.get(':nth-child(2) > .rt-TextFieldRoot > .rt-reset').type(email)
    cy.get(':nth-child(3) > .rt-TextFieldRoot > .rt-reset').type(password)
    cy.get(':nth-child(4) > .rt-TextFieldRoot > .rt-reset').type(password)
    cy.get('.rt-BaseButton').click()
    cy.contains('Sign In to your account')
    cy.get(':nth-child(1) > .rt-TextFieldRoot > .rt-reset').type(email)
    cy.get(':nth-child(2) > .rt-TextFieldRoot > .rt-reset').type(password)
    cy.get('.rt-BaseButton').click()
    cy.contains('Hi, '+name+ ' 👋')
    cy.get('img[type="button"][aria-haspopup="menu"]').click()
    cy.contains('Sign Out').click()
    cy.contains('Expense Tracker')
    cy.contains('Sign In')
  })
})