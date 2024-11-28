const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config.json').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  optionA: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  optionB: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  optionC: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync({ alter: true });

module.exports = { sequelize, Question };
