"use strict";

const mongoose = require("mongoose"),
  q = require("q"),
  config = require("../config.json"),
  reviews = require("../models/reviews.model"),
  uri = config.connectionStrings.dbs;

// mongo connection
// do we need mongo connection connection for every service or we just can connect once???
mongoose.connect(uri, function(err, res) {
  if (err) {
      console.log("ERROR connecting to: " + uri + ". " + err);
  } else {
      console.log("Succeeded connected to: " + uri);
  }
});

module.exports = {
    getReviewsByMovieId : getReviewsByMovieId,
    submitReview : submitReview
}

function getReviewsByMovieId(id) {
    let deferred = q.defer();

    reviews.find({ 'movieId': id }, function(error, result) {
        if (error) {
            console.log(error);
            deferred.reject(error);
        } else {
            deferred.resolve(result);
        }
    });

    return deferred.promise;
}

function submitReview(review) {   
    let deferred = q.defer();

    let newReview = new reviews({
        movieId: review.movieId,
        name: review.name,
        description: review.description,
        rating: review.rating
    });

    newReview.save(function(error, result) {
        if(error) {
            console.log(error);
            deferred.reject(error);
        }
        else if (result) {
           deferred.resolve(result);
        }
    });

    return deferred.promise;
}
