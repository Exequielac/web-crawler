'use strict';

const { Filters } = require('../db/database');
const FilterByPoints = require('./FilterByPoints');

jest.mock('../db/database', () => ({
    Filters: {
        findOne: jest.fn(),
        create: jest.fn(),
    },
}));

describe('FilterByPoints', () => {
    let filter;

    beforeEach(async () => {
        jest.resetAllMocks();
        Filters.findOne.mockResolvedValue({ id: 1, save: jest.fn() });
        filter = await FilterByPoints.create('test', 'test description');
    });

    it('creates an instance using the create method', async () => {
        expect(filter).toBeInstanceOf(FilterByPoints);
        expect(filter.name).toBe('test');
        expect(filter.description).toBe('test description');
    });

    it('filters entries with less than or equal to five words in the title', () => {
        const entries = [
            { title: 'This is a title with six words', points: 10 },
            { title: 'Short title', points: 20 },
            { title: 'This title has five words', points: 30 },
        ];
        const result = filter.filter(entries);
        expect(result).toHaveLength(2);
        expect(result).toContain(entries[1]);
        expect(result).toContain(entries[2]);
    });

    it('orders entries by the number of points', () => {
        const entries = [
            { title: 'Short title', points: 10 },
            { title: 'This title has five words', points: 30 },
        ];
        const result = filter.filter(entries);
        expect(result[0]).toBe(entries[1]);
        expect(result[1]).toBe(entries[0]);
    });
});
