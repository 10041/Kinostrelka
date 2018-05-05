const CrudController = require("./crud");

class VideosController extends CrudController{
    constructor(videosService, videosShema){
        super(teamsService, teamsSchema);
        // this.routes = {
        //     ...this.routes,
        //     "/:id/users/:userId": [
        //       { method: "post", cb: this.bindUser },
        //       { method: "delete", cb: this.unbindUser }
        //     ]
        //   };
        this.registerRoutes();
    }
}

module.exports = (videosService, videosShema) => {
    const videosController = new VideosController(videosService, videosShema);
  
    return videosController.router;
};