DROP DATABASE IF EXISTS travelrag_dev;

CREATE DATABASE travelrag_dev;

\c travelrag_dev;

CREATE EXTENSION IF NOT EXISTS vector;

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
    travel_style VARCHAR(255),
    interests VARCHAR(255),
    specific_keywords VARCHAR(255),
    budget VARCHAR(255),
    preferred_season VARCHAR(255),
    location_type VARCHAR(255),
    accommodation_type VARCHAR(255),
    transportation_type VARCHAR(255),
    embedding vector(768) 
);

CREATE TABLE IF NOT EXISTS destinations (
    id SERIAL PRIMARY KEY,
    destination VARCHAR(255) NOT NULL,
    search_terms VARCHAR[],
    similarity_terms VARCHAR[],
    description TEXT,
    image_url TEXT,
    cities VARCHAR[],
    best_times VARCHAR(255),
    best_times_explanation VARCHAR(255),
    embedding vector(768)
);

CREATE TABLE IF NOT EXISTS user_recommendations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    destination_id INT REFERENCES destinations(id),
    recommendation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_favorites (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    destination_id INT REFERENCES destinations(id),
    favorite_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, destination_id) -- Ensures a user can't favorite the same place twice
);

-- VISION BOARDS TABLE
CREATE TABLE vision_boards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- VISION BOARD ITEMS TABLE
CREATE TABLE vision_board_items (
    id SERIAL PRIMARY KEY,
    board_id INTEGER REFERENCES vision_boards(id) ON DELETE CASCADE,
    image_url TEXT,
    location_name VARCHAR(100) NOT NULL,
    note TEXT,
    link_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);