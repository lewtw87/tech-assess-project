const Sequelize = require('sequelize');
const QuestionModel = require('./questionModel.js');
const TagModel = require('./tagModel.js');
const UserModel = require('./userModel.js');

const sequelize = new Sequelize('techassess_elearning', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
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
  Users,
  Questions,
  Tags
};