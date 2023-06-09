export default async function handler(req, res) {

    console.log("userID " + req.body.userid);

    const data = await fetch(`http://localhost:8082/api/user/${req.body.userid}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${req.body.access_token}`
      }
    });
  
    const user = await data.json()

    console.log("fetch output: " + user);

    res.status(200).json(user);
  }