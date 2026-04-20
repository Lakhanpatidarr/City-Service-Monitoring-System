const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

router.post("/chat", async (req, res) => {
    try {
        const message = req.body.message;
        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [
                {
                    role: "user",
                    parts: [{ text: message }]
                }
            ]
        });

        res.json({
            success: true,
            reply: response.text
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});
module.exports = router;