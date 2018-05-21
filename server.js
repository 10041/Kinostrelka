const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const errors = require("./helpers/errors");

const VideosService = require('./sevices/videos');
const FilmsService = require('./sevices/films');
const UsersService = require('./sevices/users');
const CommentsService = require('./sevices/comments');

module.exports = (db, config) => {
    const app = express();

    const videosService = new VideosService(db.videos, db.films, errors);
    const filmService = new FilmsService(db.films, db.videos, errors);
    const usersService = new UsersService(db.users, db.comments, errors);
    const commentsService = new CommentsService(db.comments, db.users, db.films, errors);


    const videosShema = require('./shemas/videos');
    const filmsShema = require('./shemas/films');
    const usersShema = require('./shemas/users');
    const commentsShema = require('./shemas/comments');

    const error = require("./global-controllers/error");

    const apiController = require('./controllers/api')(
        videosService,
        filmService,
        usersService,
        commentsService,

        videosShema,
        filmsShema,
        usersShema,
        commentsShema
    )

    app.set("view engine", "pug");
    app.use(bodyParser.json());

    app.use("/", express.static(__dirname + '/views'));

    app.use("/", apiController);
    app.use("/", error);
    
    app.use("/", async (req, res) => {
        res.render("index", {__dirname});
    })
    return app;
}