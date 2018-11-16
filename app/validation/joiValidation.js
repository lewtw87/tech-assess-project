const Joi = require("Joi");

const create_question = {
    body: {
      question: Joi.string().required(),
      tags: Joi.array().required() 
    }
};

const get_question_by_tag = {
    query: {
      //tag: Joi.string().required()
      tag: Joi.alternatives().try(Joi.string().required(), Joi.array().required()).required() 
      ///tag: Joi.array().items(Joi.string()).single()
    }
  
};

module.exports = {
    create_question,
    get_question_by_tag
};