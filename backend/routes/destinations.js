// routes/destinationRoutes.js
const express = require('express');
const {
    getAllDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination,
    searchDestinations,
    updateDestinationImageUrl,
} = require('../controllers/destinationsController');

const router = express.Router();

// Get all destinations
router.get('/', getAllDestinations);

// Get destination by ID
router.get('/:id', getDestinationById);

// Create a new destination
router.post('/', createDestination);

// Search destinations
router.post('/search', searchDestinations); 

// Update destination
router.put('/:id', updateDestination);

// Delete destination
router.delete('/:id', deleteDestination);


router.patch('/:id/image', updateDestinationImageUrl);



module.exports = router;