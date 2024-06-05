'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Entries', {
        number: DataTypes.INTEGER,
        title: DataTypes.STRING,
        points: DataTypes.INTEGER,
        comments: DataTypes.INTEGER
    });
};
