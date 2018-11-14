const { Users, Questions, Tags } = require('../model/db.js');

//Gov Tech Endpoint 1
exports.create_question = function (req, res) {

    //Check if all tags are available
    let tagsArray = JSON.parse(req.body.tags);
    const tags = tagsArray.map(tagItem => Tags.findOrCreate({ where: { tag: tagItem }, defaults: { tag: tagItem }}).spread((tag, created) => tag));

    Questions.create(req.body)
    .then(questions => Promise.all(tags).then(storedTags => questions.addTags(storedTags)).then(() => questions))
    //.then(questions => Questions.findOne({ where: {id: question.id}, include: [Users, Tags]}))
    .then(questionTag => res.json(questionTag))
    .catch(err => res.status(400).json({ error: true, message: err}));
    
};


//Gov Tech Endpoint 2
exports.get_question_by_tag = function (req, res) {

    Questions.findAll({
        include: [
            { model: Tags, where: { tag: req.query.tag } }
        ]
    })
    .then(questions => res.json(questions))
    .catch(err => res.status(400).json({ err: err}));
    
    
};

/*
exports.list_questions = function (req, res) {
    Question.getAllQuestions(function (err, question) {
        if (err)
            res.send(err);

        res.send(question);
    });
};

exports.get_question_by_id = function (req, res) {
    Question.getQuestionById(req.params.questionId, function (err, question) {
        if (err)
            res.send(err);
        res.json(question);
    });
};




exports.update_question = function (req, res) {
    Question.updateById(req.params.questionId, new Question(req.body), function (err, question) {
        if (err)
            res.send(err);
        res.json(question);
    });
};

exports.delete_question = function (req, res) {
    Question.remove(req.params.questionId, function (err, question) {
        if (err)
            res.send(err);
        res.json({ message: 'Question successfully deleted' });
    });
};*/