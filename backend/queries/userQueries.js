const db = require('../db/dbConfig');
const bcrypt = require('bcrypt');

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

// Create new user
const createUser = async (user) => {
    try {
        const { username, email, password, profile_picture, bio, first_name, last_name } = user; 

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the plain password

        const newUser = await db.one(
            "INSERT INTO users (email, username, password_hash, profile_picture, bio, first_name, last_name) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [email, username, hashedPassword, profile_picture, bio, first_name, last_name]
        );
        return newUser;
    } catch (err) {
        return {error: err};
    }
};

// Log user in 
const loginUser = async (user) => {
    try {
        const loggedInUser = await db.oneOrNone("SELECT * FROM users WHERE username=$1", user.username);
        if (!loggedInUser) {
            return false;
        }

        const passwordMatch = await bcrypt.compare(user.password, loggedInUser.password_hash); 
        if (!passwordMatch) {
            return false;
        }
        return loggedInUser;
    } catch (err) {
        return { error: err };
    }
};

// Update user
const updateUser = async (user) => {
    try {
        const { id, username, email, first_name, last_name, profile_picture, bio } = user
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
    loginUser,
    updateUser,
    deleteUser,
};