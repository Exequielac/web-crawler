'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('UsageData', {
        timestamp: DataTypes.DATE,
        filterId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Filters',
                key: 'id'
            }
        },
        result: {
            type: DataTypes.JSON,
        }
    });
};
