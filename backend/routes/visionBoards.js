const express = require('express');
const {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  getItemsForBoard,
  addItemToBoard,
  updateItem,
  deleteItem
} = require('../controllers/visionBoardController');

const router = express.Router();

// All Vision Boards for current user (optionally filtered by auth middleware)
router.get('/', getAllBoards);

// Single Vision Board by ID
router.get('/:id', getBoardById);

// Create a new Vision Board
router.post('/', createBoard);

// Update a Vision Board
router.put('/:id', updateBoard);

// Delete a Vision Board
router.delete('/:id', deleteBoard);

// ------------------- BOARD ITEMS -------------------

// Get all items for a specific board
router.get('/:id/items', getItemsForBoard);

// Add a new item to a specific board
router.post('/:id/items', addItemToBoard);

// Update a specific item on any board (can also nest route under board if needed)
router.put('/items/:itemId', updateItem);

// Delete a specific item
router.delete('/items/:itemId', deleteItem);

module.exports = router;
