"use strict";

const express = require("express"),
    router = express.Router(),
    moviesService = require("../../services/movies.service");

router.get("/movies/:id", getMovieById);
router.get("/movies", getAllMoviesFiltered);
// router.post("/movies", addMovie);
// router.delete("/movies", deleteMovie)
// router.put("/movies", updateMovie)

module.exports = router;

function getMovieById(req, res) {
    if (req.params.id) {
        moviesService.getMovieById(req.params.id)
            .then(function(data) {
                res.status(200).send(data);
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    } else {
        res.status(500).send("Required Parameter: id is missing.");
    }
}

function getAllMoviesFiltered(req, res) {
    let filters = {
        rating: req.query.rating
    }
    
    if (req.query.name !== '' || req.query.name !== null) {
        filters.name = req.query.name
    }

    if (req.query.genre !== '' || req.query.genre !== null) {
        filters.genre = req.query.genre;
    }

    moviesService.getAllMoviesFiltered(filters)
        .then(function(data) {
            res.status(200).send(data);
        })
        .catch(function(err) {
            res.status(500).send(err);
        });
}
