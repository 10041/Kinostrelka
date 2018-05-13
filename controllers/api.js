const express = require("express");

module.exports = (
    videosService,
    filmsService,
    
    videosShema,
    filmsShema,
) => {
    const router = express.Router();

    const videosController = require('./videos')(videosService, videosShema);
    const filmsController = require('./films')(filmsService, filmsShema);

    router.use("/videos", videosController);
    router.use('/films', filmsController);

    return router;
}
