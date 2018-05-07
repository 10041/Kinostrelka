const CrudService = require("./crud");

class FilmsService extends CrudService {
    constructor(filmsRepository, videosRepository, errors){
        super(filmsRepository, errors);
        this.videosRepository = videosRepository;
    }
    async bindVideo(id, videoId) {
        const video = await this.videosRepository.findById(videoId, {rew:true});
        const videoBeforeUpdate = await super.read(id);
        if(!video) {
            this.errors.notFound;
        }
        return await super.update(id, {
			...videoBeforeUpdate,
			videoId: video.id
		});
    }
    async unbindVideo(id) {

    }
    async readVideo(id) {

    }
}