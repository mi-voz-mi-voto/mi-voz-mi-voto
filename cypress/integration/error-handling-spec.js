describe('Mi Voz, Mi Voto error handling flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('As a user, I should see a form for State Election Reminders with the first name, last name, state, email address, preferred language, "Sign up for email notifications" inputs and a Submit button', () => {
    cy.get('form[class="form-container"]').should('have.length', 1)
      .get('p[class="form-header"]').contains('State Election Reminders')
      .get('label[class="label"]').contains('First Name')
      .get('label[class="label"]').contains('Last Name')
      .get('label[class="label"]').contains('State')
      .get('label[class="label"]').contains('Email address')
      .get('label[class="preferred-lang-p label"]').contains('Preferred language')
      .get('label[class="label-radio"]').contains('English')
      .get('label[class="label-radio"]').contains('Spanish')
      .get('label[class="agree-to-emails-checkbox label"]').contains('Sign up for email notifications about upcoming elections in my state.')
      .get('button[class="submit-button"]').should('have.length', 1);
  });

  it('Should display a loading image while the submitting the form', () => {
    cy.fixture('user1.json').as('user1').then((user1) => {
      cy.get('input[id=first_name]').type(user1.first_name)
      cy.get('input[id=last_name]').type(user1.last_name)
      cy.get('select[id=state_name]').select(user1.state_name)
      cy.get('input[id=email]').type(user1.email)
      cy.get('input[id=english]').click()
      cy.get('input[id=agree_to_emails]').click()
      cy.get('.submit-button').click()
      cy.intercept('POST', 'http://localhost:3001/api/v1/users', {
        body: user1
      })
    })
    cy.get('.loading-icon').should('be.visible')
  })

  it('Should display an error message if the email is already subscribed', () => {
    cy.fixture('user1.json').as('user1').then((user1) => {
      cy.get('input[id=first_name]').type(user1.first_name)
      cy.get('input[id=last_name]').type(user1.last_name)
      cy.get('select[id=state_name]').select(user1.state_name)
      cy.get('input[id=email]').type(user1.email)
      cy.get('input[id=english]').click()
      cy.get('input[id=agree_to_emails]').click()
      cy.get('.submit-button').click()
      cy.intercept('POST', 'http://localhost:3001/api/v1/users', {
        body: user1
      })
    })
    cy.get('.error-text').should('contain', 'This email is already susbscribed to receive election notifications.')
  })

  it('Should display a message confirming the subscription to election notifications', () => {
    cy.fixture('user2.json').as('user2').then((user2) => {
      cy.get('input[id=first_name]').type(user2.first_name)
      cy.get('input[id=last_name]').type(user2.last_name)
      cy.get('select[id=state_name]').select(user2.state_name)
      cy.get('input[id=email]').type(user2.email)
      cy.get('input[id=english]').click()
      cy.get('input[id=agree_to_emails]').click()
      cy.get('.submit-button').click()
      cy.intercept('POST', 'http://localhost:3001/api/v1/users', {
        body: user2
      })
      cy.get('.success-message').should('contain', `You are now registered to receive notifications about upcoming elections in your state. A confirmation email has been sent to ${user2.email}.`)
    })
  })

  it('Should display an error image & error message if the server can\'t complete the request', () => {
    cy.fixture('user1.json').as('user1').then((user1) => {
      cy.get('input[id=first_name]').type(user1.first_name)
      cy.get('input[id=last_name]').type(user1.last_name)
      cy.get('select[id=state_name]').select(user1.state_name)
      cy.get('input[id=email]').type(user1.email)
      cy.get('input[id=english]').click()
      cy.get('input[id=agree_to_emails]').click()
      cy.get('.submit-button').click()
      cy.intercept('POST', 'http://localhost:3001/api/v1/users', {
        body: {"first_name": "Elise"}
      })
    })
    cy.get('.error-text').should('contain', 'We\'re sorry, please try again.')
  })

  it.skip('Should display a button to send the user back to the form', () => {

  })

  it.skip('', () => {

  })
})
