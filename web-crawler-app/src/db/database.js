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
  Entry: require('../models/Entry')(sequelize, Sequelize.DataTypes),
  Filter: require('../models/Filter')(sequelize, Sequelize.DataTypes),
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

module.exports = {
  ...models,
  sequelize,
  authenticateDB
};
