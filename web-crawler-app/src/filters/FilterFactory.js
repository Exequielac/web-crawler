'use strict';

class FilterFactory {
    static filterInstances = {};

    static async initializeFilter(FilterClass, filterArgs, filterName) {
        if (!this.filterInstances[filterName]) {
            this.filterInstances[filterName] = await FilterClass.create(...filterArgs);
        }
    }

    static getFilterInstance(filterName) {
        if (!this.filterInstances[filterName]) {
            throw new Error(`Filter ${filterName} not initialized`);
        }
        return this.filterInstances[filterName];
    }
}

module.exports = FilterFactory;
