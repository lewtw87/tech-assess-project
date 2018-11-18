const Joi = require("Joi");

const create_question = {
    body: {
      question: Joi.string().required(),
      tags: Joi.array().required() 
    }
};

const get_question_by_tag = {
    query: {
      tag: Joi.alternatives().try(Joi.string().required(), Joi.array().required()).required().error(errors => {
        return {
          message: "Please specify one or more tag."
        };
      }) 
    }
  
};

const create_quiz = {
    body: {
      questions: Joi.array().items(Joi.object().keys({
        id: Joi.number().integer().required(),
        weight: Joi.number().required().positive().allow(0)
      }).required()).required(),
      length: Joi.number().integer().required()
    }
};

module.exports = {
    create_question,
    get_question_by_tag,
    create_quiz
};