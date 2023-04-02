export default async function handler(req, res) {

        console.log(req.query.userCode);
    
      const data = await fetch(`https://neume.eu.auth0.com/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'x-www-form-urlencoded'
        },
        body: {
          'grant_type': 'authorization_code',
          'client_id': 'Uu2hAFUBPQ37sD8F3P8ZHRfbfk2GyI35',
          'client_secret': 'ayeZZFfA1ZlSBCBf2fhNZgYgpWwHfj5P2yOTVGb0NjI3OREGUQkODXW45XopV3X7',
          'code': req.query.userCode,
          'redirect_uri': 'http://localhost:3000/'
        }
      });
    
      const products = await data.json()

      res.status(200).json(products);
    }
    
    