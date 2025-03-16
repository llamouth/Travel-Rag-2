// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();

// All Users
router.get('/', userController.getAllUsers);

// Single User
router.get('/:id', userController.getUserById);

// Update User
router.put('/:id', userController.updateUser);

// Delete User
router.delete('/:id', userController.deleteUser)

// User registration route
router.post('/register', userController.registerUser);

// User login route
router.post('/login', userController.loginUser);

// Add more user routes as needed

module.exports = router;