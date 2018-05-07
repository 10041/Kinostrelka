const express = require("express");
const bodyParser = require("body-parser");

const errors = require("./helpers/errors");

const VideosService = require('./sevices/crud');

module.exports = (db, config) => {
    const app = express();

    const videosService = new VideosService(db.videos, errors);

    const error = require("./global-controllers/error");
    const apiController = require('./controllers/api')(
        
    )
}