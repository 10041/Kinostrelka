const CrudController = require("./crud");

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
        this.registerRoutes();
    }

    async readVideos(req, resp) {
        const id = req.params.id;
    
        resp.send(await this.service.readVideos(id));
    }
}

module.exports = (filmsService, filmsShema) => {
    const filmsController = new FilmsController(filmsService, filmsShema);
  
    return filmsController.router;
};