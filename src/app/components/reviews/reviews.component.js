"use strict"

angular
    .module('movie-app')
    .component("reviews", {
        templateUrl: "./app/html/templates/components/reviews/reviews.template.html",
        controller: ReviewsController
    });

    ReviewsController.$inject = ['reviews.service', '$routeParams', '$location'];

function ReviewsController(reviewsService, $routeParams, $location) {
    var self = this;

    self.reviews = [];
    self.params = $routeParams;
    self.movieId = self.params.id;

    self.$onInit = function() {
        self.getReviewsByMovieId(self.movieId);
        self.getMovieDetails(self.movieId);
    };

    self.back = function() {
        $location.path("/");
    };

    self.getReviewsByMovieId = function(id) {
         reviewsService.getReviewsByMovieId(id)
            .then(function(res) {
                self.reviews = res.data;
            })
            .catch(function(err) {
                throw new Error(err);
            });
    };

    self.submitReview = function(review) {
        review.movieId = self.movieId;

        reviewsService.submitReview(self.movieId, review)
            .then(function(res){
                self.getReviewsByMovieId(self.movieId);
            })
            .catch(function(err) {
                throw new Error(err); 
            });
    }

    self.getMovieDetails = function(id) {
        reviewsService.getMovieById(id)
            .then(function(res) {
                self.movieDetails = res.data
            })
            .catch(function(err) {
                throw new Error(err); 
            });
    }

};
