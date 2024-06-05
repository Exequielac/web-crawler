'use strict';

const path = require('path');
require('dotenv').config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '/workspace/.env'
      : '/workspace/.devcontainer/.env'
  )
});

const Sequelize = require('sequelize');
const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(dbConfig);

const models = {
  Filters: require('../models/Filters')(sequelize, Sequelize.DataTypes),
  UsageData: require('../models/UsageData')(sequelize, Sequelize.DataTypes),
};

const authenticateDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err;
  }
};

const createTablesIfNotExist = async () => {
  try {
    // In a real production env we should use another 
    // strategy to create tables, like migrations
    await sequelize.sync({ alter: true });
    console.log('Tables created if not exist...');
  } catch (err) {
    console.error('Unable to create tables:', err);
    throw err;
  }
};

module.exports = {
  ...models,
  sequelize,
  authenticateDB,
  createTablesIfNotExist
};