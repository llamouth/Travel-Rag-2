// queries/destinationQueries.js
const db = require('../db/dbConfig');

// Get all destinations
const getAllDestinations = async () => {
    try {
        return await db.any('SELECT * FROM destinations');
    } catch (error) {
        throw error;
    }
};

// Get destination by ID
const getDestinationById = async (id) => {
    try {
        return await db.oneOrNone('SELECT * FROM destinations WHERE id = $1', id);
    } catch (error) {
        throw error;
    }
};

// Create a new destination
const createDestination = async (name, description, location, image_url) => {
    try {
        return await db.one(
            'INSERT INTO destinations (name, description, location, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, location, image_url]
        );
    } catch (error) {
        throw error;
    }
};

// Update destination
const updateDestination = async (id, name, description, location, image_url) => {
    try {
        return await db.oneOrNone(
            'UPDATE destinations SET name = $2, description = $3, location = $4, image_url = $5 WHERE id = $1 RETURNING *',
            [id, name, description, location, image_url]
        );
    } catch (error) {
        throw error;
    }
};

// Delete destination
const deleteDestination = async (id) => {
    try {
        return await db.oneOrNone('DELETE FROM destinations WHERE id = $1 RETURNING *', id);
    } catch (error) {
        throw error;
    }
};

const searchDestinations = async (queryEmbedding) => {
    try {
        return await db.any(`
            SELECT id, name, description, (embedding <-> $1::vector) AS distance
            FROM destinations
            ORDER BY distance ASC
            LIMIT 10;
        `, [queryEmbedding]);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination,
    searchDestinations
};