const db = require('../db/dbConfig');

// Get all users
const getAllUsers = async () => {
    try {
        return await db.any('SELECT * FROM users');
    } catch (error) {
        throw error;
    }
};

// Get user by ID
const getUserById = async (id) => {
    try {
        return await db.oneOrNone('SELECT * FROM users WHERE id = $1', id);
    } catch (error) {
        throw error;
    }
};

// Create a new user (as before)
const createUser = async (username, email, password_hash, first_name, last_name) => {
    try {
        return await db.one(
            'INSERT INTO users (username, email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [username, email, password_hash, first_name, last_name]
        );
    } catch (error) {
        throw error;
    }
};

// Get user by email (as before)
const getUserByEmail = async (email) => {
    try {
        return await db.oneOrNone('SELECT * FROM users WHERE email = $1', email);
    } catch (error) {
        throw error;
    }
};

// Update user
const updateUser = async (id, username, email, first_name, last_name, profile_picture, bio) => {
    try {
        return await db.oneOrNone(
            'UPDATE users SET username = $2, email = $3, first_name = $4, last_name = $5, profile_picture = $6, bio = $7 WHERE id = $1 RETURNING *',
            [id, username, email, first_name, last_name, profile_picture, bio]
        );
    } catch (error) {
        throw error;
    }
};

// Delete user
const deleteUser = async (id) => {
    try {
        return await db.oneOrNone('DELETE FROM users WHERE id = $1 RETURNING *', id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    getUserByEmail,
    updateUser,
    deleteUser,
};