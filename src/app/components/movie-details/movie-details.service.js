"use strict";

angular
    .module('movie-app')
    .factory("movieDetails.service", MovieDetailsService);

MovieDetailsService.$inject = ['$http', '$log'];

function MovieDetailsService($http, logger) {
     return {
        getAllMoviesFiltered: getAllMoviesFiltered
    }    

    function getAllMoviesFiltered(name, rating, genre) {
        var url = '/api/movies?rating=' + encodeURIComponent(rating)

        if (name) {
            url = url + '&name=' + encodeURIComponent(name)
        }

        if (genre) {
            url = url + '&genre=' + genre;
        }

        return $http.get(url)
                .then(onSuccess)
                .catch(onFailure);
    };

    function onSuccess(response) {
        return response;
    };

    function onFailure(err) {
        logger.error(err);
    };
};
