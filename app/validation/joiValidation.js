const Joi = require("Joi");

const create_question = {
    body: {
      question: Joi.string().required(),
      tags: Joi.string().required()
    }
};

const get_question_by_tag = {
    params: {
      tag: Joi.string().required()
    }
  
};

module.exports = {
    create_question,
    get_question_by_tag
};