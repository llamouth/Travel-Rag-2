// routes/destinationRoutes.js
const express = require('express');
const destinationController = require('../controllers/destinationsController');

const router = express.Router();

// Get all destinations
router.get('/', destinationController.getAllDestinations);

// Get destination by ID
router.get('/:id', destinationController.getDestinationById);

// Create a new destination
router.post('/', destinationController.createDestination);

// Update destination
router.put('/:id', destinationController.updateDestination);

// Delete destination
router.delete('/:id', destinationController.deleteDestination);

module.exports = router;