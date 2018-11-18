const db = require('../../db.js');

//Gov Tech Endpoint 1
exports.create_question = function (req, res) {

    //Check if all tags are available
    //let tagsArray = JSON.parse(req.body.tags);
    const tags = req.body.tags.map(tagItem => db.Tags.findOrCreate({ where: { tag: tagItem }, defaults: { tag: tagItem }}).spread((tag, created) => tag));

    db.Questions.create(req.body)
    .then(questions => Promise.all(tags).then(storedTags => questions.addTags(storedTags)).then(() => questions))
    .then(questionTag => res.status(201).json({id: questionTag.id })) //return 201 for POST succeed status
    .catch(function(err) {
        console.log(err);
        res.status(400).json({ error: true, message: "There is a problem querying the database."});
    });
    
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
        res.status(400).json({ error: true, message: "There is a problem querying the database."});
    });*/
    
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
        res.json({questions: x});
    }).catch(function(err) {
        console.log(err);
        res.status(400).json({ error: true, message: "There is a problem querying the database."});
    });

};

//Gov Tech Endpoint 3
exports.create_quiz = function (req, res) {
    if(req.body.length > req.body.questions.length)   
    {
        //Check if length must be less than number of questions in the req "where m <= n"
        res.status(400).json({ error: true, message: "Requested length exceed the number of questions."});
    } 
    else
    {
        let sumOfWeights = req.body.questions.reduce(function(memo, question) {
            return memo + question.weight;
            }, 0);
        let selectedWeigths = {};
        let selectedId = [];
        const probabilityOfDistribution = sumOfWeights * 20; //Alvin: Higher for more accuracy and less variation

        for (var key in req.body.questions) {
            const question = req.body.questions[key];
            selectedWeigths[question.id] = 0;
        }

        for (var i = 0; i < probabilityOfDistribution; i++) {
            let random = Math.random() * (sumOfWeights + 1);
            for (var key in req.body.questions) {
                const question = req.body.questions[key];
                //console.log(question);
                random -= question.weight;
                if(random <= 0)
                {
                    selectedWeigths[question.id] = (selectedWeigths[question.id] || 0) + 1;
                    break;
                }
            }
        }  

        var sortedWeights = Object.keys(selectedWeigths).map(function(key) {
            return [key, selectedWeigths[key]];
        });
        
        
        // Sort the array based on the second element
        sortedWeights.sort(function(first, second) {
            return second[1] - first[1];
        });

        console.log(sortedWeights); // ALV: first is id, 2nd is distributed probability (% of occurence)

        for (var i = 0; i < req.body.length; i++) { // now lets iterate in sort order
            var key = parseInt(sortedWeights[i][0]);
            selectedId.push(key);
        } 

        res.json({ questions: selectedId });
    }
    

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