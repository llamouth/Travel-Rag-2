// routes/userRoutes.js
const express = require('express');
const {
    allUsers,
    userById,
    updatedUser,
    deletedUser,
    registerUser,
    userLogIn,
} = require('../controllers/usersController');
const visionBoardsRoutes = require('./visionBoards');


const router = express.Router();

router.use('/vision-boards', visionBoardsRoutes)

// All Users
router.get('/', allUsers);

// Single User
router.get('/:id', userById);

// Update User
router.put('/:id', updatedUser);

// Delete User
router.delete('/:id', deletedUser)

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', userLogIn);

module.exports = router;