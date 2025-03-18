DROP DATABASE IF EXISTS travelrag_dev;

CREATE DATABASE travelrag_dev;

\c travelrag_dev;

CREATE EXTENSION IF NOT EXISTS vector;
-- CREATE EXTENSION plv8;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    bio TEXT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    preferred_activities VARCHAR(255),
    vacation_budget INTEGER,
    location VARCHAR(255),
    favorite_season VARCHAR(255),
    preferences_embedding vector(768) -- Embedding vector 
);

CREATE TABLE IF NOT EXISTS destinations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    image_url VARCHAR(255),
    embedding vector(768) 
);

CREATE TABLE IF NOT EXISTS user_recommendations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    destination_id INT REFERENCES destinations(id),
    recommendation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kaggle_data (
    id SERIAL PRIMARY KEY,
    age INTEGER,
    gender VARCHAR(10),
    income INTEGER,
    education_level VARCHAR(50),
    travel_frequency INTEGER,
    preferred_activities TEXT,
    vacation_budget INTEGER,
    location VARCHAR(50),
    proximity_to_mountains INTEGER,
    proximity_to_beaches INTEGER,
    favorite_season VARCHAR(20),
    pets BOOLEAN,
    environmental_concerns BOOLEAN,
    preference BOOLEAN,
    user_text TEXT,
    embedding vector(768)
);

CREATE TABLE IF NOT EXISTS user_favorites (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    destination_id INT REFERENCES destinations(id),
    favorite_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, destination_id) -- Ensures a user can't favorite the same place twice
);
