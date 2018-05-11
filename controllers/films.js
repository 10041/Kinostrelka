const CrudController = require("./crud");
const imgMulter = require("../helpers/image")('videos');

class FilmsController extends CrudController{
    constructor(filmsService, filmsShema){
        super(filmsService, filmsShema);

        this.readVideos = this.readVideos.bind(this);

        this.routes = {
            ...this.routes,
            "/:id/videos": [
              { method: "get", cb: this.readVideos }
            ]
        };
        this.routes["/"].unshift({ method: "post", img: imgMulter, cb: this.uploadImg, schema: super.schema.create});
        this.routes["/:id"].unshift({ method: "post", img: imgMulter, cb: this.uploadImg, schema: super.schema.update});
        this.registerRoutes();
    }

    async readVideos(req, resp) {
        const id = req.params.id;
    
        resp.send(await this.service.readVideos(id));
    }
    async uploadImg(req, res, next){
        console.log(req.file);
        console.log(req.body);
        req.body.preview_path = req.file.filename
        next();
    }
}

module.exports = (filmsService, filmsShema) => {
    const filmsController = new FilmsController(filmsService, filmsShema);
  
    return filmsController.router;
};