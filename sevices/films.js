const CrudService = require("./crud");
const fs = require('fs');
const Op = require("sequelize").Op;


const rootPath = require('app-root-path')
const pathFolder = `${rootPath}\\views\\images\\videos\\`;

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
    async delete(id) {
        const film = await super.read(id);

        if(isEmpty(film.preview_path))
            fs.unlink(pathFolder + film.preview_path, (err) => {});

        return await super.repository.destroy({ where: { id } });
    }
    async update(id, data) {
        const film = await super.read(id);

        if(isEmpty(film.preview_path))
            fs.unlink(pathFolder + film.preview_path, (err) => {});

        await super.repository.update(data, { where: { id }, limit: 1 });
        
		return await this.read(id);
    }
    async find(name) {
        return await this.repository.findAll({
            where: {
				name:{
					[Op.like]: `%${name}%`
				}
            }
        });
    }
}

module.exports = FilmsService;