// routes/gemini.js
const express = require('express');
const router = express.Router();
const geminiController = require('../controllers/geminiController');

router.get('/:destination', geminiController.getDestinationDetails);
router.get('/cities/:destination', geminiController.getCities);
router.get('/description/:destination', geminiController.getDescription);
router.get('/best-time/:destination', geminiController.getBestTimeToVisit);

module.exports = router;