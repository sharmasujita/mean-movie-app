"use strict";

const express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    validator = require("express-validator");

let server = function(config){
    config = config || {};

    let self = {};

    self.log = function(message) {
        if (config.log !== false) {
            console.log(message);
        }
    };

    self.error = function(message) {
        console.log(message);
    }

    self.start = function() {
        self.express = express();
        self.express.use(bodyParser.urlencoded({ extended: true }));
        self.express.use(bodyParser.json());
        self.express.use(methodOverride("X-HTTP-Method-Override"));
        self.express.use(express.static("build"));

        config.port = config.port || process.env.port || 80;

        let instance = self.express.listen(config.port);

        require("./api/index")(self.express);

        self.log("Localhost" + config.port);

        return instance;
    };

    return self;

}

server.start = function(config){
    let instance = new server(config);
    instance.start();
    return instance;
}

module.exports = server;
