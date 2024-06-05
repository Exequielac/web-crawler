'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Filters', {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    });
};
