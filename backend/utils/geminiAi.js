require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const geminiAi = async (userPreferences) => {

  const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const geminiPrompt = `
    Recommend travel destinations based on the following:
      Preferences: ${userPreferences.preferred_activities},  ${userPreferences.favorite_season}
      Budget: ${userPreferences.vaction_budget}
      Current Location: ${userPreferences.Location}
    
      Provide the recommendations in the following format:
      [
        {
          "name": "Destination Name",
          "description": "Short Description",
          "category": "Day Trip/Weekend/Longer Trip"
        },
        {
          "name": "Another Destination Name",
          "description": "Another Short Description",
          "category": "Day Trip/Weekend/Longer Trip"
        },
        ... (more destinations) ...
      ]
    
      Please provide actual destinaion names. E.G(New York, Ny, Atlanta, GA) Only provide the recommendations in the specified format. Do not include any additional text or explanations.
    `;
    
    const geminiResult = await geminiModel.generateContent(geminiPrompt);
    const geminiResponse = await geminiResult.response;
    return geminiResponse.text();
}

module.exports = geminiAi;