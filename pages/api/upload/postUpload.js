import formidable from "formidable";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import getStream from "into-stream";
import fs from "fs";
import axios from "axios";
import { MongoClient } from "mongodb";

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }
    
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        
    if (err) {
        console.error('Error parsing form data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
    // Access the uploaded file
    const audioFile = files.audio;

    // console.log(audioFile["originalFilename"]);

    const fileUpload = await uploadFile(audioFile);
    const runSTT = await callStt(audioFile["originalFilename"]);

    const contentUrl = await getTranscription(runSTT);

    const getText = await getTextFromTranscription(contentUrl);
    
    const getModeration = await runModeration(getText);

    const uploadPodcast = await savePodcast(audioFile["originalFilename"], getModeration, req.query.uid);
    
    //console.log("Transcribed text: " + getTextFromTranscription(contentUrl));

    res.status(200).json({ message: 'Message uploaded!' });

    });
}

// Upload to Blob storage
async function uploadFile(audioFile) {

    const blobServiceClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=neume;AccountKey=GM1mvhiapouI4seoWWGNrOAvrTBsj9+Emz/gWZUcn6hBGjtFb9Z4JzJoIg+lqo5Ju6UyTOTXeYJG+AStTicPFg==;EndpointSuffix=core.windows.net")
    const containerClient = blobServiceClient.getContainerClient('podcasts');

    const blockBlobClient = containerClient.getBlockBlobClient(audioFile["originalFilename"]);
    const fileStream = fs.createReadStream(audioFile.filepath);

    return await blockBlobClient.uploadStream(fileStream);
}

async function callStt(fileName){

    const body = {
        "contentUrls": [
          `https://neume.blob.core.windows.net/podcasts/${fileName}`
        ],
        "properties": {
          "diarizationEnabled": false,
          "wordLevelTimestampsEnabled": true,
          "punctuationMode": "DictatedAndAutomatic",
          "profanityFilterMode": "Masked"
        },
        "locale": "en-US",
        "displayName": "Neume-podcast"
    }

    const response = await axios.post('https://westeurope.api.cognitive.microsoft.com/speechtotext/v3.1/transcriptions/', body, {
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': '85331c606ae4496bb94cca71f47e63ae'
        },
      })
      .then(response => {
        //console.log(response.data);

        var url = response.data.self.split('/');
        //console.log(url["6"]);

        return url["6"];
      });

      return response
}

async function getTranscription(transcriptionId){

    // console.log(transcriptionId);

    const response = await axios.get(`https://westeurope.api.cognitive.microsoft.com/speechtotext/v3.1/transcriptions/${transcriptionId}/files`, {
        headers: {
          'Ocp-Apim-Subscription-Key': '85331c606ae4496bb94cca71f47e63ae'
        },
      });

    if(response.data.values.length > 1) {
        return response.data.values["0"].links.contentUrl
    } else {
        await new Promise(resolve => setTimeout(resolve, 20000));
        return getTranscription(transcriptionId);
    }
}

async function getTextFromTranscription(contentUrl) {

    const fetchJson = await fetch(contentUrl)
    .then(response => response.json())
    .then(data => {
        
        const jsonValue = data.combinedRecognizedPhrases["0"].lexical;
        
        return jsonValue
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return fetchJson;
}

async function runModeration(getText) {
    
    const sliceText = getText.slice(0, 1024);

    const body = sliceText;

    const res = await axios.post(`https://westeurope.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessText/Screen`, body, {
        headers: {
          'Content-Type': 'text/plain',
          'Ocp-Apim-Subscription-Key': '09e7609757d749b7a251a58e4f2be769'
        },
        params: {
            autocorrect: true,
            classify: true,
        }
      });

    if (res.data) {
        return res.data;
    }
}

async function savePodcast(fileName, getModeration, userId) {

    const data = {
        "userId": userId,
        "contentUrl": `https://neume.blob.core.windows.net/podcasts/${fileName}`,
        "moderationResult": getModeration
    }

    const client = await MongoClient.connect("mongodb+srv://stefandeboer:kfY4RyWzQNR1axm0@cluster0.7dakmvs.mongodb.net/?retryWrites=true&w=majority");

    const db = client.db("podcasts");

    const yourCollection = db.collection("podcasts");

    const result = await yourCollection.insertOne(data);

    return result;
}