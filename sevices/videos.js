const CrudService = require("./crud");
const fs = require("fs");
const rootPath = require('app-root-path')
const pathFolder = `${rootPath}\\image\\videos\\`;

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
    async delete(id) {
        const video = await super.read(id);
        fs.unlink(pathFolder + video.preview_path, (err) => {});

        return await super.repository.destroy({ where: { id } });
    }
    async update(id, data) {
        const video = await super.read(id);
        fs.unlink(pathFolder + video.preview_path, (err) => {});
        await super.repository.update(data, { where: { id }, limit: 1 });
        
		return await this.read(id);
    }
}

module.exports = VideosService;