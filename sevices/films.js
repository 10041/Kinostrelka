const CrudService = require("./crud");

class FilmsService extends CrudService {
    constructor(filmsRepository, videosRepository, errors){
        super(filmsRepository, errors);
        this.videosRepository = videosRepository;
    }
    
    async readVideo(id) {
        const film = await super.read(id);

        return await super.readChunk({}, this.videosRepository, {
            filmId: film.id
        })
    }
}