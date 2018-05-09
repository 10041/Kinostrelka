const CrudService = require("./crud");

class FilmsService extends CrudService {
    constructor(filmsRepository, videosRepository, errors){
        super(filmsRepository, errors);
        this.videosRepository = videosRepository;
    }
    
    async readVideos(id) {
        const film = await super.read(id);

        if(!film) {
            this.errors.notFound;
        }

        return await super.readChunk({}, this.videosRepository, {
            filmId: film.id
        })
    }
}

module.exports = FilmsService;