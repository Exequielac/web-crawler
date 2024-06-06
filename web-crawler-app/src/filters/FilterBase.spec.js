'use strict';

const FilterBase = require('./FilterBase');
const { Filters } = require('../db/database');

jest.mock('../db/database', () => ({
    Filters: {
        findOne: jest.fn(),
        create: jest.fn(),
    },
}));

describe('FilterBase', () => {
    beforeEach(() => {
        Filters.findOne.mockClear();
        Filters.create.mockClear();
    });

    describe('create', () => {
        it('sets name and description', async () => {
            Filters.findOne.mockResolvedValue(null);
            Filters.create.mockResolvedValue({ id: 1 });
            const filter = await FilterBase.create('name', 'description');
            expect(filter.name).toBe('name');
            expect(filter.description).toBe('description');
        });
    });

    describe('initializeFromDatabase', () => {
        it('updates existing filter', async () => {
            Filters.findOne.mockResolvedValue({ id: 1, save: jest.fn() });
            const filter = await FilterBase.create('name', 'description');
            await filter.initializeFromDatabase();
            expect(Filters.findOne).toHaveBeenCalledWith({ where: { name: 'name' } });
            expect(filter.internalId).toBe(1);
        });

        it('creates new filter', async () => {
            Filters.findOne.mockResolvedValue(null);
            Filters.create.mockResolvedValue({ id: 2 });
            const filter = await FilterBase.create('name', 'description');
            await filter.initializeFromDatabase();
            expect(Filters.create).toHaveBeenCalledWith({ name: 'name', description: 'description' });
            expect(filter.internalId).toBe(2);
        });
    });

    describe('filter', () => {
        it('throws when not implemented', async () => {
            Filters.findOne.mockResolvedValue(null);
            Filters.create.mockResolvedValue({ id: 3 });
            const filter = await FilterBase.create('name', 'description');
            expect(() => filter.filter()).toThrow(Error);
        });
    });

    describe('_countWords', () => {
        it('counts words in a string', async () => {
            Filters.findOne.mockResolvedValue(null);
            Filters.create.mockResolvedValue({ id: 4 });
            const filter = await FilterBase.create('name', 'description');
            const count = filter._countWords('This is a it string');
            expect(count).toBe(5);
        });
    });

    describe('constructor', () => {
        it('throws when directly invoked', () => {
            expect(() => new FilterBase()).toThrow(TypeError);
        });
    });
});
