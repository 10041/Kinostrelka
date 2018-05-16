const CrudController = require("./crud");
const imgMulter = require("../helpers/image")('films');

class FilmsController extends CrudController{
    constructor(filmsService, filmsShema){
        super(filmsService, filmsShema);

        this.readVideos = this.readVideos.bind(this);
        this.uploadImg = this.uploadImg.bind(this);

        this.routes = {
            ...this.routes,
            "/:id/videos": [
              { method: "get", cb: this.readVideos }
            ]
        };
        this.routes["/"].unshift({ method: "post", img: imgMulter, cb: this.uploadImg, schema: this.schema.create});
        this.routes["/:id"].unshift({ method: "post", img: imgMulter, cb: this.uploadImg, schema: this.schema.update});
        this.registerRoutes();
    }

    async readVideos(req, resp) {
        const id = req.params.id;
        const film = await this.service.read(id);
        const videos = await this.service.readVideos(id);
        resp.render('film', {film, videos: videos.data});
    }
    async uploadImg(req, res, next){
        console.log(req.file);
        req.body.preview_path = req.file.filename || ''
        res.send(await this.service.create(req.body));
    }
}

module.exports = (filmsService, filmsShema) => {
    const filmsController = new FilmsController(filmsService, filmsShema);
  
    return filmsController.router;
};