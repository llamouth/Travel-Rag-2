// controllers/userController.js
const { getAllUsers, getUserById, updateUser, deleteUser, createUser, loginUser } = require('../queries/userQueries');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;


// Get all users
const allUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get user by ID
const userById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user
const updatedUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userUpdated = await updateUser({id, ...req.body});
        if (userUpdated) {
            res.status(200).json({ user: userUpdated });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete user
const deletedUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userDeleted = await deleteUser(id);
        if (userDeleted) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// User registration (as before)
const registerUser = async (req, res) => {
    try {
        const newUser = await createUser(req.body);

        if (newUser.error) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ userId: newUser.id }, SECRET, { expiresIn: '1h' });
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// User login (as before)
const userLogIn = async (req, res) => {
    try {
        const userLoggedIn = await loginUser(req.body)

        if (userLoggedIn?.error || !userLoggedIn) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: userLoggedIn.id }, SECRET, { expiresIn: '1h' });
        res.status(200).json({ user: userLoggedIn, token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    allUsers,
    userById,
    updatedUser,
    deletedUser,
    registerUser,
    userLogIn,
};