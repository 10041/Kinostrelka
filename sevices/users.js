const CrudService = require("./crud");

class UsersService extends CrudService {
    constructor(usersRepository, commentsRepository, errors){
        super(usersRepository, errors);
        this.commentsRepository = commentsRepository;
    }
}

module.exports = UsersService;