'use strict';

const { Filters } = require('../db/database');
const FilterByComments = require('./FilterByComments');

jest.mock('../db/database', () => ({
    Filters: {
        findOne: jest.fn(),
        create: jest.fn(),
    },
}));

describe('FilterByComments', () => {
    let filter;

    beforeEach(async () => {
        Filters.findOne.mockResolvedValue({ id: 1, save: jest.fn() });
        filter = await FilterByComments.create('test', 'test description');
    });

    it('creates an instance using the create method', async () => {
        expect(filter).toBeInstanceOf(FilterByComments);
        expect(filter.name).toBe('test');
        expect(filter.description).toBe('test description');
    });

    it('filters entries with more than five words in the title', () => {
        const entries = [
            { title: 'This is a title with six words', comments: 10 },
            { title: 'This is a short title', comments: 20 },
            { title: 'This title is exactly six words long', comments: 30 },
        ];
        const result = filter.filter(entries);
        expect(result).toHaveLength(2);
        expect(result).toContain(entries[0]);
        expect(result).toContain(entries[2]);
    });

    it('orders entries by the number of comments', () => {
        const entries = [
            { title: 'This is a title with six words', comments: 10 },
            { title: 'This title is exactly six words long', comments: 30 },
        ];
        const result = filter.filter(entries);
        expect(result[0]).toBe(entries[1]);
        expect(result[1]).toBe(entries[0]);
    });
});
