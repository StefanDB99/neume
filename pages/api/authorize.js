export default async function handler(req, res) {

  const body = JSON.parse(req.body)

  console.log(body);

  // const data = await fetch(`https://neume.eu.auth0.com/oauth/token`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   body: {
  //     'grant_type': 'authorization_code',
  //     'client_id': 'Uu2hAFUBPQ37sD8F3P8ZHRfbfk2GyI35',
  //     'client_secret': 'ayeZZFfA1ZlSBCBf2fhNZgYgpWwHfj5P2yOTVGb0NjI3OREGUQkODXW45XopV3X7',
  //     'code': req.query,
  //     'redirect_uri': 'http://localhost:3000/?code*'
  //   }
  // });
  // console.log(context.query);

  // const products = await data.json()

  res.status(200).json(req.query);
}

