import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL; 

export const fetchRecommendations = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/userRecommendations/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchDestinations = async (query) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/destinations/search`, { query });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchKaggleData = async (query) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/kaggleData/search`, { query });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserPreferences = async (userId, preferences) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/userPreferences/${userId}`, preferences );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/users/register`,  user );
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUserPreferences = async (userId, preferences) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/userPreferences/${userId}`, preferences);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRecommendations = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/userRecommendations/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserPreferences = async (userId) => { 
  try {
    const response = await axios.get(`${API_BASE_URL}/userPreferences/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function fetchPhotosUnsplash(product) {
  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';
  try {
    const response = await axios.get(UNSPLASH_URL, {
      params: {
        query: product,
        client_id: UNSPLASH_ACCESS_KEY,
        per_page: 1 
      }
    });

    // Access the photos from the response
    return response.data.results;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}

export const fetchUser = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGeminiDetails = async (destination) => { 
  try {
    const response = await axios.get(`${API_BASE_URL}/gemini/${destination}`);
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const updateDestinationImageUrl = async (destinationId, imageUrl) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/destinations/${destinationId}/image`, {
      image_url: imageUrl,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDestinationDetails = async (destinationId, details) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/destinations/${destinationId}/details`, {details});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDestination = async (destinationId) => { 
  try {
    const response = await axios.get(`${API_BASE_URL}/destinations/${destinationId}`);
    return response.data;
  }catch (error) {
    throw error;
  }
};