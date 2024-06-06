'use strict';

const FilterBase = require('./FilterBase');

class FilterByComments extends FilterBase {
    filter(entries) {
        return entries
            .filter(entry => this._countWords(entry.title) > 5)
            .sort((a, b) => b.comments - a.comments);
    }
}

module.exports = FilterByComments;