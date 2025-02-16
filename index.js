const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

app.post('/content', async (req, res) => {
    const question = req.body.question;
    
    try {
        const result = await model.generateContent(question);
        const response = await result.response.text();
        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});