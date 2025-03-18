const {
  getAllUserRecommendations: getAllUserRecommendationsQuery,
  getUserRecommendationsByUserId: getUserRecommendationsByUserIdQuery,
  createUserRecommendation: createUserRecommendationQuery,
  deleteUserRecommendation: deleteUserRecommendationQuery,
} = require('../queries/userRecommendationsQueries');
const generateEmbedding  = require('../utils/generateEmbedding');
const { getUserPreferencesById } = require('../queries/usersPreferencesQueries');
const { searchDestinations } = require('../queries/destinationsQueries');
const { searchKaggleData } = require('../queries/kaggleDataQueries');
const parseGeminiRecommendations = require('../utils/parseRecommendations');
const geminiAi = require('../utils/geminiAi');



// Get all user recommendations
const getAllUserRecommendations = async (req, res) => {
  try {
    const recommendations = await getAllUserRecommendationsQuery();
    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error getting all user recommendations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user recommendations by ID
const getUserRecommendationsById = async (req, res) => {
  try {
    const { id } = req.params;
    const userPreferences = await getUserPreferencesById(id);
    
    if (!userPreferences) {
      return res.status(404).json({ error: 'User preferences not found' });
    }
    
    const preferencesText = `${userPreferences.preferred_activities} ${userPreferences.vacation_budget} ${userPreferences.location} ${userPreferences.favorite_season}`;

    const userPreferenceEmbedding = await generateEmbedding(preferencesText);

    
    const geminiText = await geminiAi(userPreferences)

    // Parse Gemini recommendations 
    const geminiRecommendations = parseGeminiRecommendations(geminiText); // Parse Gemini's output

    // 2. Database and Vector Search
    const kaggleDataResults = (await searchKaggleData(userPreferenceEmbedding)).slice(0, 5);

    // 3. Combine and Rank Results
    const combinedResults = { gemini: geminiRecommendations, kaggle: kaggleDataResults }

    const topRecommendations = combinedResults;

    res.status(200).json(topRecommendations);
  } catch (error) {
      console.error('Error generating recommendations:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};
  
// Create user recommendation
const createUserRecommendation = async (req, res) => {
    try {
      const { user_id, destination_id } = req.body;
      const newRecommendation = await createUserRecommendationQuery(user_id, destination_id);
      res.status(201).json({ message: 'User recommendation created successfully', recommendation: newRecommendation });
    } catch (error) {
      console.error('Error creating user recommendation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
  // Delete user recommendation
const deleteUserRecommendation = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRecommendation = await deleteUserRecommendationQuery(id);
      if (deletedRecommendation) {
        res.status(200).json({ message: 'User recommendation deleted successfully' });
      } else {
        res.status(404).json({ error: 'User recommendation not found' });
      }
    } catch (error) {
      console.error('Error deleting user recommendation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
module.exports = {
    getAllUserRecommendations,
    getUserRecommendationsById,
    createUserRecommendation,
    deleteUserRecommendation,
};