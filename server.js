const express = require("express");
const bodyParser = require("body-parser");

const errors = require("./helpers/errors");

const VideosService = require('./sevices/videos');
const FilmsService = require('./sevices/films');

module.exports = (db, config) => {
    const app = express();

    const videosService = new VideosService(db.videos, db.films, errors);
    const filmService = new FilmsService(db.films, db.videos, errors);

    const videosShema = require('./shemas/videos');
    const filmsShema = require('./shemas/films');

    const error = require("./global-controllers/error");
    const apiController = require('./controllers/api')(
        videosService,
        filmService,
        videosShema,
        filmsShema,
    )

    app.use(bodyParser.json());
    app.use("/", apiController);
    app.use("/", error);

    return app;
}