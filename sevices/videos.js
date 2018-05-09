const CrudService = require("./crud");

class VideosService extends CrudService {
    constructor(videosRepository, filmsRepository, errors){
        super(videosRepository, errors);
        this.filmsRepository = filmsRepository;
    }
    async bindVideo(id, filmId) {
        const videoBeforeUpdate = await super.read(id);
        const film = await this.filmsRepository.findById(filmId, {raw: true});

        if(!videoBeforeUpdate || !film) {
            this.errors.notFound;
        }

        return await super.update(id, {
			...videoBeforeUpdate,
			filmsId: filmId
		});
    }
    async unbindVideo(id) {
        const videoBeforeUpdate = await super.read(id);
        if(!videoBeforeUpdate) {
            this.errors.notFound;
        }
        return await super.update(id, {
            ...videoBeforeUpdate,
            filmsId: null
        })
    }
}

module.exports = VideosService;