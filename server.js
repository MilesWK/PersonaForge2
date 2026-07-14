import { OpenRouter } from "@openrouter/sdk";
import express from 'express';

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


async function callai(pi) {
    const response = await client.chat.send({
    chatRequest: {
            model: "~openai/gpt-mini-latest",
            messages: [
                { role: "user", content: `${pi}` },
            ],
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
    const prompt = req.query.prompt
    const response = await callai(prompt)
    console.log(response)
    res.status(200).json({result: response}); 
});