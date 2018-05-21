const CrudController = require("./crud");

class CommentsController extends CrudController{
    constructor(commentsService, commentsShema){
        super(commentsService, commentsShema);

        this.readComments = this.readComments.bind(this);
        this.routes = {
            ...this.routes,
            "/film/:id/": [
                { method: "get", cb: this.readComments, schema: this.schema.read }
            ]
        }
        this.registerRoutes();
    }

    async readComments(req, res) {
        res.send(await this.service.getFilmComments(req.params.id));
    }
}

module.exports = (commentsService, commentsShema) => {
    const commentsController = new CommentsController(commentsService, commentsShema);
  
    return commentsController.router;
};