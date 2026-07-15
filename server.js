import { OpenRouter } from "@openrouter/sdk";
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Backend is up! ✅</h1>');
});

app.listen(port, () => {
    console.log(`Backend opperational. Port: ${port}`);
});


process.loadEnvFile()

const client = new OpenRouter({
    apiKey: process.env.API_KEY,
    serverURL: "https://ai.hackclub.com/proxy/v1",
});


async function callai(pi, lt) {
    const response = await client.chat.send({
    chatRequest: {
            model: "~openai/gpt-mini-latest",
            lt,
            stream: false,
        },
    });
    const result = response.choices[0].message.content;
    return result
}

app.get('/aicall', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    console.log("ooooh a call!")
    const {prompt, list} = req.query
    console.log(list)
    const response = await callai(prompt,  JSON.parse(list))
    console.log(response)
    res.status(200).json({result: response}); 
});

// const uri = `mongodb+srv://MilesWK:${process.env.MONGODB_PASSWORD}@personaforge.l0bspqq.mongodb.net/?appName=PersonaForge`;
// const mdclient = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     await mdclient.connect();
//     await mdclient.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     await mdclient.close();
//   }
// }
// run().catch(console.dir);