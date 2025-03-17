// routes/kaggleDataRoutes.js
const { Router } = require('express');
const {
  getAllKaggleData,
  getKaggleDataById,
  createKaggleData,
  updateKaggleData,
  deleteKaggleData,
} = require('../controllers/kaggleDataController');

const router = Router();

// Get all kaggle data
router.get('/', getAllKaggleData);

// Get kaggle data by ID
router.get('/:id', getKaggleDataById);

// Create kaggle data
router.post('/', createKaggleData);

// Update kaggle data
router.put('/:id', updateKaggleData);

// Delete kaggle data
router.delete('/:id', deleteKaggleData);

module.exports = router;