'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Filters',
        {
            name: {
                type: DataTypes.STRING,
                unique: true,
            },
            description: DataTypes.STRING,
        },
        {
            tableName: 'filters',
        },
    );
};
