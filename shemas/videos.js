const joi = require('joi');

const defaultSchema = {
    //link: joi.string().required(),
    //preview_path: joi.string().required(),
    //preview_text: joi.string().required(),
    filmId: joi.number().min(0),
    file: joi.object()
};

const notRequiredSchema = {
    link: joi.string(),
    preview_path: joi.string(),
    preview_text: joi.string(),
    filmId: joi.number().min(0),
    file: joi.object()
}

const onlyIdSchema = {
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
      body: notRequiredSchema,
      params: onlyIdSchema
    },
  
    delete: {
      params: onlyIdSchema
    }
};