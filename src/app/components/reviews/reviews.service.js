"use strict";

angular
    .module('movie-app')
    .factory("reviews.service", ReviewsService);

ReviewsService.$inject = ['$http', '$log'];


function ReviewsService($http, logger) {
    return {
        getMovieById: getMovieById,
        getReviewsByMovieId: getReviewsByMovieId,
        submitReview: submitReview
    };

    function getReviewsByMovieId(id) {
        return $http.get('/api/movies/' + id + '/reviews')
                .then(onSuccess)
                .catch(onFailure);
    };

    function submitReview(movieId, review) {
        return $http.post('/api/movies/' + movieId + '/reviews', { review: review })
                .then(onSuccess)
                .catch(onFailure);
    };

    function getMovieById(id) {
        return $http.get('/api/movies/' + id)
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
