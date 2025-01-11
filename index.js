const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const express = require('express')
const app = express();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
app.use(express.json())
app.get('/content', (req, res) => {
    const question = req.body.question;
    const prompt = question;

    const generate =async () => {
        try {
            const result = await model.generateContent(prompt);
            res.json(result.response.text());
        } catch (e) {
            console.log(e);
        }
    }
    generate()
})
app.listen(3000)