const express = require('express');
const ratingController = require('../Controllers/ratingController');
const router = express.Router();

router.post('/ratings-post', ratingController.createRating);
router.get('/ratings', ratingController.getAllRatings);
router.get('/rating/:id', ratingController.getRatingById);
router.put('/rating/:id', ratingController.updateRating);
router.delete('/rating/:id', ratingController.deleteRating);

module.exports = router;