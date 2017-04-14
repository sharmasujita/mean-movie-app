"use strict";

const express = require("express"),
    router = express.Router(),
    reviewsService = require("../../services/reviews.service");

router.get("/movies/:id/reviews", getReviewsByMovieId);
router.post("/movies/:id/reviews", submitReview);

module.exports = router;

function getReviewsByMovieId(req, res) {
    
    let movieId = req.params.id;

    if(movieId) {
         reviewsService.getReviewsByMovieId(movieId)
            .then(function(data) {
                res.status(200).send(data);
            })
            .catch(function(err) {
                res.status(500).send(err);
            })
    }
    else {
        res.status(500).send("Unable to find Id:" + movieId );
    }
   
}

function submitReview(req, res) {
    if (req.body.review) {
        reviewsService.submitReview(req.body.review)
            .then(function(data) {
                res.status(200).send(data);
            })
            .catch(function(err) {
                res.status(500).send(err);
            })
    } else {
        res.status(500).send("Review parameter missing.");
    }
}
