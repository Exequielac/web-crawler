'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Filter', {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    });
};
