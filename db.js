const Sequelize = require('sequelize');
const QuestionModel = require('./app/model/questionModel.js');
const TagModel = require('./app/model/tagModel.js');
const UserModel = require('./app/model/userModel.js');
const Op = Sequelize.Op;

const sequelize = new Sequelize('techassess_elearning', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: { $and: Op.and, $in: Op.in }
});



const Users = UserModel(sequelize, Sequelize);
// QuestionTag = Association tables (many to many relationship)
const QuestionTag = sequelize.define('questions_tags', {});
const Questions = QuestionModel(sequelize, Sequelize);
const Tags = TagModel(sequelize, Sequelize);

Questions.belongsToMany(Tags, { through: QuestionTag, unique: false });
Tags.belongsToMany(Questions, { through: QuestionTag, unique: false });

sequelize.sync({ force: false }) //Change to true to drop and recreate table
  .then(() => {
    console.log(`DB & Tables created`)
  });

module.exports = {
  sequelize,
  Users,
  Questions,
  Tags
};