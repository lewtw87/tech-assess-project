/*
var Tag = require('../model/tagModel.js');

exports.list_tags = function (req, res) {
    Tag.getAllTags(function (err, tag) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', tag);
        res.send(tag);
    });
};



exports.create_tag = function (req, res) {
    var new_tag = new Tag(req.body);

    //handles null error 
    if (!new_tag.tag) {

        res.status(400).send({ error: true, message: 'Please provide tag' });

    }
    else {

        Tag.createTag(new_tag, function (err, tag) {

            if (err)
                res.send(err);
            res.json(tag);
        });
    }
};


exports.get_tag = function (req, res) {
    Tag.getTagById(req.params.tagId, function (err, tag) {
        if (err)
            res.send(err);
        res.json(tag);
    });
};


exports.update_tag = function (req, res) {
    Tag.updateById(req.params.tagId, new Tag(req.body), function (err, tag) {
        if (err)
            res.send(err);
        res.json(tag);
    });
};


exports.delete_tag = function (req, res) {
    Tag.remove(req.params.tagId, function (err, tag) {
        if (err)
            res.send(err);
        res.json({ message: 'Tag successfully deleted' });
    });
};*/