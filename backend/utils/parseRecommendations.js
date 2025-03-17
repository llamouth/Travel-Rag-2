function parseGeminiRecommendations(geminiText) {
    try {
        // Remove the ```json and ``` markers
        const cleanedText = geminiText.replace("```json", "").replace("```", "").trim();

        // Parse the cleaned JSON
        const recommendations = JSON.parse(cleanedText);

        return recommendations.map(rec => ({ ...rec, distance: 0.9 }));
    } catch (error) {
        console.error("Error parsing Gemini recommendations:", error);
        return [];
    }
}

module.exports = parseGeminiRecommendations