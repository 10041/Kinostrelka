const joi = require('joi');

const defaultShema = {
    name: joi.string().required(),
    name_original: joi.string(),
    genre: joi.string().required(),
    country: joi.string().required(),
    age_limit: joi.number().min(0).max(21).required(),
    plot: joi.string().required(),
    release_date: joi.date().required(),
    release_bel: joi.date().required(),
    release_rus: joi.date().required(),
    in_roles: joi.string().required(),
    director: joi.string().required(),
    film_script: joi.string(), //сценарист
    music: joi.string(),
    operator: joi.string(),
    producer: joi.string(),
    company: joi.string(),
};

const notRequiredShema = {
    name: joi.string(),
    name_original: joi.string(),
    genre: joi.string(),
    country: joi.string(),
    age_limit: joi.number().min(0).max(21),
    plot: joi.string(),
    release_date: joi.date(),
    release_bel: joi.date(),
    release_rus: joi.date(),
    in_roles: joi.string(),
    director: joi.string(),
    film_script: joi.string(), //сценарист
    music: joi.string(),
    operator: joi.string(),
    producer: joi.string(),
    company: joi.string(),
}

const onlyIdShema = {
    id: joi
        .number()
        .min(0)
        .required()
};

module.exports = {
    read: {
      params: onlyIdSchema
    },
  
    readAll: {},
  
    create: {
      body: defaultSchema
    },
  
    update: {
      body: notRequiredShema,
      params: onlyIdSchema
    },
  
    delete: {
      params: onlyIdSchema
    }
};