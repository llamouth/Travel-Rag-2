require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const geminiAi = async (prompt) => {
    try {
        const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const geminiResult = await geminiModel.generateContent(prompt);
        const geminiResponse = await geminiResult.response;
        return geminiResponse.text();
    } catch (error) {
        console.error('Error querying Gemini AI:', error);
        throw error;
    }
};

module.exports = geminiAi;