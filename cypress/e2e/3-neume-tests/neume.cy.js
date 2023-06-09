

describe('example to-do app', () => {
  

  it('User login', () => {
    
    cy.login()
        .then((resp) => {
          return resp.body;
        })
        .then((body) => {
          const {access_token, expires_in, id_token} = body;
          const auth0State = {
            nonce: '',
            state: 'some-random-state'
          };

          window.localStorage.setItem('token', access_token);

          const callbackUrl = `/`;
          cy.visit(callbackUrl, {
            onBeforeLoad(win) {
              win.document.cookie = 'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State);
            }
          });

          cy.get('input[name="username"]').type('test@cypress.com');
          cy.get('input[name="password"]').type('Test1234');
  
          // Submit the login form
          cy.get('button[name="action"]').eq(0).click({force:true});

          cy.origin('http://localhost:3000', () => {

            cy.visit('/')

            cy.get('section').should('be.visible');

          });
          
      })

  })

  it('User makes a transaction', () => {
    
    const token = window.localStorage.getItem('token');

    cy.visit('http://localhost:3000/Subscribe');

 
    // Make request to create transaction
    cy.request({
      method: 'POST',
      url: 'https://stefandeboer.com/neume-billing-service/api/Transaction',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: {
          "id": 1278,
          "date": "2023-04-20T10:18:37.476Z",
          "paymentMethod": "string",
          "status": "string",
          "customerID": "auth0|6480c67b9f640e2819529534",
          "description": "string"
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    });

    //Give the service time to process the request
    cy.wait(10000);


    // Make request to get updated user
    cy.request({
      method: 'GET',
      url: `https://stefandeboer.com/neume-user-service/api/user/auth0|6480c67b9f640e2819529534`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('userIsPremium', true);
    });
    
  })

  
})

