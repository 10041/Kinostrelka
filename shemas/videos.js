const joi = require('joi');

const defaultSchema = {
  filmId: joi.number().min(0).required(),
  link: joi.string().required(),
  preview_text: joi.string().required(),
    
};

const notRequiredSchema = {
  link: joi.string(),
  preview_text: joi.string(),
  filmId: joi.number().min(0),
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