describe('Auth0 Login Test', () => {
    it('should log in a user successfully', () => {

        

      // Visit the login page
      cy.visit('localhost:3000/');
  
      // Enter the user credentials
      cy.get('input[name="username"]').type('test@test.com');
      cy.get('input[name="password"]').type('Test1234');
  
      // Submit the login form
      cy.get('button[name="action"]').eq(0).click({force:true});
  
      //cy.get('button[value="accept"]').click({force:true});
      // Assert that the user is logged in

       // Assuming a "Welcome" message is displayed after login

        cy.origin('http://localhost:3000', () => {

            cy.visit('/')

            cy.get('h1')
            // Invoke the text method to get its content
            .invoke('text')
            // Use a callback function to assign the text to a variable
            .then((text) => {
                // Declare a variable and assign the text to it
                let h1Text = text;
                // Do something with the variable
                cy.setCookie('userToken', h1Text);
                cy.log(h1Text);
            });

        });
      
  
      // Additional assertions or checks can be added as needed
    });
  });