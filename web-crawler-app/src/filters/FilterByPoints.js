'use strict';

const FilterBase = require('./FilterBase');

class FilterByPoints extends FilterBase {
    filter(entries) {
        return entries
            .filter(entry => this._countWords(entry.title) <= 5)
            .sort((a, b) => b.points - a.points);
    }
}

module.exports = FilterByPoints;