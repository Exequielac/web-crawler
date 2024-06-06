'use strict';

const { Filters } = require('../db/database');

class FilterBase {
    constructor(name, description) {
        if (new.target !== this.constructor || new.target === FilterBase) {
            throw new TypeError(
                'Cannot construct FilterBase instances directly',
            );
        }
        this.name = name;
        this.description = description;
    }

    async initializeFromDatabase() {
        try {
            let filter = await Filters.findOne({ where: { name: this.name } });
            if (filter) {
                filter.description = this.description;
                await filter.save();
            } else {
                filter = await Filters.create({
                    name: this.name,
                    description: this.description,
                });
            }
            this.internalId = filter.id;
        } catch (error) {
            console.error('Error initializing Filter:', error);
            throw error;
        }
    }

    static async create(name, description) {
        if (this === FilterBase) {
            throw new TypeError('Cannot call create on FilterBase directly');
        }

        const instance = new this(name, description);
        await instance.initializeFromDatabase();
        return instance;
    }

    filter() {
        throw new Error('filter method must be implemented');
    }

    _countWords(str) {
        return str.split(' ').filter((word) => /\w/.test(word)).length;
    }
}

module.exports = FilterBase;
