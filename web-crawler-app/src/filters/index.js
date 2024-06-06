'use strict';

const FilterByComments = require('./FilterByComments');
const FilterByPoints = require('./FilterByPoints');

const commentsFilterInstance = FilterByComments.create('FilterByComments', 'Filters entries with less than 10 comments');
const pointsFilterInstance = FilterByPoints.create('FilterByPoints', 'Filters entries with less than 5 words in the title');

module.exports = {
    commentsFilterInstance,
    pointsFilterInstance
};
