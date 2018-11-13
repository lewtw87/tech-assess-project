'use strict';

var sql = require('./db.js');

//Task object constructor
var Tag = function (tag) {
    this.tag = tag.tag;
};

Tag.createTag = function createTag(newTag, result) {
    sql.query("INSERT INTO tags set ?", newTag, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Tag.getTagById = function getTag(tagId, result) {
    sql.query("Select id, question from tags where id = ? ", tagId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
Tag.getAllTags = function getAllTags(result) {
    sql.query("Select * from tags", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('tags : ', res);

            result(null, res);
        }
    });
};
Tag.updateById = function (id, question, result) {
    sql.query("UPDATE tags SET tag = ? WHERE id = ?", [question.question, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Tag.remove = function (id, result) {
    sql.query("DELETE FROM tags WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};

module.exports = Tag;