const express = require('express');
const ratingController = require('../Controllers/ratingController');
const router = express.Router();

router.post('/', ratingController.createRating);
router.get('/', ratingController.getAllRatings);
router.get('/:id', ratingController.getRatingById);
router.put('/:id', ratingController.updateRating);
router.delete('/:id', ratingController.deleteRating);

module.exports = router;