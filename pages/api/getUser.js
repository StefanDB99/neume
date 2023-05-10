export default async function handler(req, res) {

  const data = await fetch('https://neume.eu.auth0.com/userinfo', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${req.body.access_token}`
    }
  });

  const user = await data.json()

  res.status(200).json(user);
}
