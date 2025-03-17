const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generateEmbedding(text) {
    try {
        const model = genAI.getGenerativeModel({ model: "embedding-001" });
        const result = await model.embedContent(text);
        const embeddingArray = result.embedding.values;

        // Convert JavaScript array to string literal for pgvector
        const vectorString = `[${embeddingArray.join(',')}]`;

        return vectorString;
    } catch (error) {
        console.error('Error generating embedding:', error);
        return null;
    }
}

module.exports =  generateEmbedding ;