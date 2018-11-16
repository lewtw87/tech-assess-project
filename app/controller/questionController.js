const db = require('../../db.js');

//Gov Tech Endpoint 1
exports.create_question = function (req, res) {

    //Check if all tags are available
    //let tagsArray = JSON.parse(req.body.tags);
    const tags = req.body.tags.map(tagItem => db.Tags.findOrCreate({ where: { tag: tagItem }, defaults: { tag: tagItem }}).spread((tag, created) => tag));

    db.Questions.create(req.body)
    .then(questions => Promise.all(tags).then(storedTags => questions.addTags(storedTags)).then(() => questions))
    .then(questionTag => res.status(201).json(questionTag)) //return 201 for POST succeed status
    .catch(err => res.status(400).json({ error: true, message: err}));
    
};


//Gov Tech Endpoint 2
exports.get_question_by_tag = function (req, res) {

    /*db.Questions.findAll({
        attributes: ['id', 'question'],
        include: [
            { 
                model: db.Tags, 
                where: { tag: req.query.tag },
                attributes: []
            }
        ],
        group: ['question.id'],
        having: [db.Sequelize.literal('COUNT(DISTINCT ?) >= ?'), '`tag.tag`', req.query.tag.length]
    })
    .then(questions => res.json(questions))
    .catch(function(err) {
        console.log(err);
        res.status(400).json({ err: "There is a problem querying the database."});
    });*/
    
    //TODO, currently this query retrieve all records that matching any of the tags, need to filter to records matching ALL the tags

    let tagArrayString = "";
    let tagCount = 0;
    if(Array.isArray(req.query.tag)) 
    {
        tagArrayString = "'" + req.query.tag.join("','") + "'";
        tagCount = req.query.tag.length;
    }
    else
    {
        tagArrayString = "'" + req.query.tag + "'";
        tagCount = 1;
    }
    db.sequelize.query(`SELECT DISTINCT q.id, q.question 
        FROM questions q 
        INNER JOIN questions_tags qt ON q.id = qt.questionid 
        INNER JOIN tags t ON qt.tagid = t.id WHERE t.tag IN (` + tagArrayString + `)
        GROUP BY q.id
        HAVING COUNT(DISTINCT t.tag) >= ` + tagCount + `
    `, { type: db.sequelize.QueryTypes.SELECT}).then(x => {
        console.log(x);
        res.json(x);
    });

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