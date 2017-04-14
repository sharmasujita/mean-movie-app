"use strict";

const mongoose = require("mongoose"),
  q = require("q"),
  config = require("../config.json"),
  movies = require("../models/movies.model"),
  uri = config.connectionStrings.dbs;

// mongo connection
mongoose.connect(uri, function(err, res) {
  if (err) {
      console.log("ERROR connecting to: " + uri + ". " + err);
  } else {
      console.log("Succeeded connected to: " + uri);
  }
});

module.exports = {
    getAllMoviesFiltered : getAllMoviesFiltered,
    getMovieById: getMovieById
};

function getMovieById(id) {
    let deferred = q.defer();

    movies.findOne({ "id": id }, function(error, result) {
        if (error) {
            console.log(error);
            deferred.reject(error);
        }
        if (result) {
            deferred.resolve(result);
        }
    });

    return deferred.promise;
}

function getAllMoviesFiltered(filters) {
    let deferred = q.defer(); 
    let params = {}

    if (filters.genre) {
        params = Object.assign(params, { "genre" : filters.genre });
    };

    if (filters.name) {
        params = Object.assign(params, { "title": {$regex : filters.name, $options: "i"} });
    }

    movies.find(params, function(error, result) {
        if (error) {
            console.log(error);
            deferred.reject(error);
        }
        if (result) {
            deferred.resolve(sortMovies(result, filters.rating));
        }
    });

    return deferred.promise;
}

function sortMovies(movies, byRating) {
    if (byRating == 'By Highest Rating') {
        return movies.sort(function(a, b) {
            return b.rating - a.rating
        });
    } else {
        return movies.sort(function(a, b) {
            return a.rating - b.rating
        });
    }
}
