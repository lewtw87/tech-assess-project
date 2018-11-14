module.exports = (sequelize, type) => {
    return sequelize.define('questions', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        question: type.STRING
    });
};