const CrudController = require("./crud");

class VideosController extends CrudController{
    constructor(videosService, videosShema){
        super(videosService, videosShema);

        this.bindVideo = this.bindVideo.bind(this);
        this.unbindVideo = this.unbindVideo.bind(this);

        this.routes = {
            ...this.routes,
            "/:id/film/:filmId": [
              { method: "post", cb: this.bindVideo }
            ],
            "/:id/unbind": [
              { method: "delete", cb: this.unbindVideo }
            ]
        };
        this.registerRoutes();
    }

    async bindVideo(req, resp) {
        const filmId = req.params.filmId;
        const id = req.params.id;
    
        resp.send(await this.service.bindVideo(id, filmId));
    }
    
      async unbindVideo(req, resp) {
        const id = req.params.id;
    
        resp.send(await this.service.unbindVideo(id));
    }
}

module.exports = (videosService, videosShema) => {
    const videosController = new VideosController(videosService, videosShema);
  
    return videosController.router;
};