import { MongoClient } from "mongodb";

export default async function handler(req, res) {

    const client = await MongoClient.connect("mongodb+srv://stefandeboer:kfY4RyWzQNR1axm0@cluster0.7dakmvs.mongodb.net/?retryWrites=true&w=majority");

    const db = client.db("podcasts");

    const yourCollection = db.collection("podcasts");

    const result = await yourCollection.find().toArray();

    console.log("fetch: " + result);

    return res.status(200).json({ result });
  }