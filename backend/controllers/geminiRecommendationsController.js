const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const getGeminiRecommendations = async (req, res) => {
    try {
        const { preferences, history, budget, location } = req.body;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
            Recommend travel destinations based on the following:
            Preferences: ${preferences}
            Travel History: ${history}
            Budget: ${budget}
            Current Location: ${location}

            Provide a list of destinations with a short description for each.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ recommendations: text });
    } catch (error) {
        console.error('Error generating Gemini recommendations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getGeminiRecommendations,
};