"use strict";

angular
    .module('movie-app')
    .component("movieDetails", {
        templateUrl: "./app/html/templates/components/movie-details/movie-details.template.html",
        
        controller: MovieDetailsController

    });

MovieDetailsController.$inject = ['movieDetails.service', '$location']; // location : set, get path from url

function MovieDetailsController(movieDetailsService, $location) {
    var self = this;

    self.movies = [];

    self.ratingFilters = [{ text: 'By Highest Rating'}, { text: 'By Lowest Rating' }];
    self.genreTypes = [{ text: '' }, { text: 'Action' }, { text: 'Horror'} , { text: 'Drama' }];

    self.selectedRatingFilter = 'By Highest Rating';
    self.selectedGenre = '';
    self.showDetails = false;
    self.searchText = '';
    self.today = new Date();
    self.$onInit = function() {
        self.getAllMoviesFiltered();
    };

    self.showMoreDetails = function() {
        self.showDetails = !self.showDetails;
    };

    self.viewReviews = function(id) {
        $location.path('/movies/' + id + '/reviews');
    };

    self.getAllMoviesFiltered = function() {
        movieDetailsService.getAllMoviesFiltered(self.searchText, self.selectedRatingFilter, self.selectedGenre)
            .then(function(res) {
                console.log(res);
                self.movies = res.data;
                self.movies.forEach(function(movie) {
                    movie.showDetails = false;
                });
            })
            .catch(function(err) {
                throw new Error(err);
            });
    };
}
