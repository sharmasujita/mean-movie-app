angular.module("movie-app", ["ngMaterial", "ngMessages", "ngRoute", "angularMoment"])
        .config(function($routeProvider) {
            $routeProvider
                .when("/", {
                    template: "<movie-details></movie-details>"
                })
                .when("/movies/:id/reviews", {
                    template: "<reviews></reviews>"
                })
        });
