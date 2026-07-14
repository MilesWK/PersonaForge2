import { OpenRouter } from "@openrouter/sdk";
// import express from 'express';

// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//     res.send('<h1>Backend is up! ✅</h1>');
// });

// app.listen(port, () => {
//     console.log(`Backend opperational. Port: ${port}`);
// });


process.loadEnvFile()

const client = new OpenRouter({
    apiKey: process.env.API_KEY,
    serverURL: "https://ai.hackclub.com/proxy/v1",
});


async function callai(pi) {
    const response = await client.chat.send({
    chatRequest: {
            model: "openrouter/free",
            messages: [
                { role: "user", content: `${pi}` },
            ],
            stream: false,
        },
    });
    const check_response = response.choices[0].message.content;
    return check_response
}

console.log(await callai("Hi!"))


// app.get('/aicall', async (req, res) => {
//     const prompt = req.query.prompt
//     const is_character = await check_if_character(prompt)
//     res.status(200).json({result: character_image}); 
// });