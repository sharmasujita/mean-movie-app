"use strict";

const movies = require("./controllers/movies.controller"),
    reviews = require("./controllers/reviews.controller");

function Routes(app) {
    app = app || {};

    // rendering our angular applications
    app.get("/", function(req, res) {
        res.sendFile("index.html", { root: "build" });
    });

    // registering our abstracted express routes
    app.use("/api", movies);
    app.use("/api", reviews);
}

module.exports = Routes;
