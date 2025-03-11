const express = require('express');
const ratingController = require('../Controllers/ratingController');
const verifyToken = require('../MiddleWares/verifyToken');
const router = express.Router();

router.post('/rating-post',verifyToken, ratingController.createRating);
router.get('/ratings',verifyToken, ratingController.getAllRatings);
router.get('/rating/:id',verifyToken, ratingController.getRatingById);
router.put('/rating/update/:id',verifyToken, ratingController.updateRating);
router.delete('/rating/delete/:id',verifyToken, ratingController.deleteRating);

module.exports = router;