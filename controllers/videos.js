const CrudController = require("./crud");
const imgMulter = require("../helpers/image")('videos');

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
            ],
            
        };
        this.routes["/"].unshift({ method: "post", img: imgMulter, cb: this.uploadImg});
        console.log(this.routes);
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

    async uploadImg(req, res, next){
        console.log(req.file);
        next();
    }
}

module.exports = (videosService, videosShema) => {
    const videosController = new VideosController(videosService, videosShema);
  
    return videosController.router;
};