const joi = require('jpi');

const defaultShema = {
    link: joi.string().required(),
    preview_path: joi.string().required(),
    preview_text: joi.string().required(),
};

const notRequiredShema = {
    link: joi.string(),
    preview_path: joi.string(),
    preview_text: joi.string(),
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