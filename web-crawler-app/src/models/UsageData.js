'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('UsageData', {
        timestamp: DataTypes.DATE,
        filterId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Filter',
                key: 'id'
            }
        },
        entryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Entry',
                key: 'id'
            }
        }
    });
};
