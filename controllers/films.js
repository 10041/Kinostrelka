const CrudController = require("./crud");
const imgMulter = require("../helpers/image")('films');

class FilmsController extends CrudController{
    constructor(filmsService, filmsShema){
        super(filmsService, filmsShema);

        this.readVideos = this.readVideos.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
        this.find = this.find.bind(this);
        
        let oldRoutes = this.routes;

        this.routes = {
            "/find": [
                {method: "get", cb: this.find, schema: this.schema.find}
            ],
            "/:id/videos": [
                { method: "get", cb: this.readVideos, schema: this.schema.read }
            ],
            ...oldRoutes
        }

        this.routes["/"].unshift({ method: "post", img: imgMulter, cb: this.uploadImg, schema: this.schema.create});
        this.routes["/:id"].unshift({ method: "post", img: imgMulter, cb: this.uploadImg, schema: this.schema.update});
        
        this.registerRoutes();
    }

    async readVideos(req, res) {
        const id = req.params.id;
        const film = await this.service.read(id);
        const videos = await this.service.readVideos(id);
        res.render('film', {film, videos: videos.data});
    }
    async uploadImg(req, res, next){
        console.log(req.file);
        req.body.preview_path = req.file.filename || ''
        res.send(await this.service.create(req.body));
    }
    async find(req, res){
        res.send(await this.service.find(req.query.name));
    }
}

module.exports = (filmsService, filmsShema) => {
    const filmsController = new FilmsController(filmsService, filmsShema);
  
    return filmsController.router;
};