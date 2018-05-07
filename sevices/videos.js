const CrudService = require("./crud");

class VideosService extends CrudService {
    constructor(videosRepository, filmsRepository, errors){
        super(videosRepository, errors);
        this.filmsRepository = filmsRepository;
    }
    
}