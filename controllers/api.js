const express = require("express");

module.exports = (
    
) => {
    const router = express.Router();

    const videosController = require('./videos')(videosService, videosShema);

    router.use("/videos", videosController);

    return router;
}
