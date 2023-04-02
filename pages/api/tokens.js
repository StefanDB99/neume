export default async function handler(req, res) {


    const bodyData = { 
        grant_type: 'authorization_code',
        client_id: 'Uu2hAFUBPQ37sD8F3P8ZHRfbfk2GyI35',
        client_secret: 'ayeZZFfA1ZlSBCBf2fhNZgYgpWwHfj5P2yOTVGb0NjI3OREGUQkODXW45XopV3X7',
        code: req.body.user_code,
        redirect_uri: 'http://localhost:3000/'
    };

    console.log(req.body.user_code);

  const data = await fetch('https://neume.eu.auth0.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyData)
  });

  const products = await data.json()

  console.log(products)

  res.status(200).json(products);
}