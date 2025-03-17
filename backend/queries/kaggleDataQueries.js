// queries/kaggleDataQueries.js
const db = require('../db/dbConfig');

// Get all kaggle data
const getAllKaggleData = async () => {
  try {
    return await db.any('SELECT * FROM kaggle_data');
  } catch (error) {
    throw error;
  }
};

// Get kaggle data by ID
const getKaggleDataById = async (id) => {
  try {
    return await db.oneOrNone('SELECT * FROM kaggle_data WHERE id = $1', id);
  } catch (error) {
    throw error;
  }
};

// Create kaggle data
const createKaggleData = async (data) => {
  try {
    const {
      age,
      gender,
      income,
      education_level,
      travel_frequency,
      preferred_activities,
      vacation_budget,
      location,
      proximity_to_mountains,
      proximity_to_beaches,
      favorite_season,
      pets,
      environmental_concerns,
      preference,
      user_text,
      embedding,
    } = data;
    return await db.one(
      'INSERT INTO kaggle_data (age, gender, income, education_level, travel_frequency, preferred_activities, vacation_budget, location, proximity_to_mountains, proximity_to_beaches, favorite_season, pets, environmental_concerns, preference, user_text, embedding) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *',
      [
        age,
        gender,
        income,
        education_level,
        travel_frequency,
        preferred_activities,
        vacation_budget,
        location,
        proximity_to_mountains,
        proximity_to_beaches,
        favorite_season,
        pets,
        environmental_concerns,
        preference,
        user_text,
        embedding,
      ]
    );
  } catch (error) {
    throw error;
  }
};

// Update kaggle data
const updateKaggleData = async (id, data) => {
  try {
    const {
      age,
      gender,
      income,
      education_level,
      travel_frequency,
      preferred_activities,
      vacation_budget,
      location,
      proximity_to_mountains,
      proximity_to_beaches,
      favorite_season,
      pets,
      environmental_concerns,
      preference,
      user_text,
      embedding,
    } = data;
    return await db.oneOrNone(
      'UPDATE kaggle_data SET age = $2, gender = $3, income = $4, education_level = $5, travel_frequency = $6, preferred_activities = $7, vacation_budget = $8, location = $9, proximity_to_mountains = $10, proximity_to_beaches = $11, favorite_season = $12, pets = $13, environmental_concerns = $14, preference = $15, user_text = $16, embedding = $17 WHERE id = $1 RETURNING *',
      [
        id,
        age,
        gender,
        income,
        education_level,
        travel_frequency,
        preferred_activities,
        vacation_budget,
        location,
        proximity_to_mountains,
        proximity_to_beaches,
        favorite_season,
        pets,
        environmental_concerns,
        preference,
        user_text,
        embedding,
      ]
    );
  } catch (error) {
    throw error;
  }
};

// Delete kaggle data
const deleteKaggleData = async (id) => {
  try {
    return await db.oneOrNone('DELETE FROM kaggle_data WHERE id = $1 RETURNING *', id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllKaggleData,
  getKaggleDataById,
  createKaggleData,
  updateKaggleData,
  deleteKaggleData,
};