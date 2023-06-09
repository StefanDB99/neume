describe('login', () => {
    it('should successfully log into our app', () => {
      
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
    });
  });