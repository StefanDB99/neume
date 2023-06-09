describe('Button click and API requests', () => {
  it('clicks the button and makes a POST and GET request', () => {

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
  });
});