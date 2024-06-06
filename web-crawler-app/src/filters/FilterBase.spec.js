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
    class Subclass extends FilterBase { }
    let instance;

    beforeEach(() => {
        jest.resetAllMocks();
        Filters.findOne.mockResolvedValue({ id: 1, save: jest.fn() });
        instance = null;
    });

    describe('create', () => {
        it('throws when directly invoked', async () => {
            await expect(() => FilterBase.create("name", "desc")).rejects.toThrow(TypeError);
        });

        it('creates an instance when invoked on a subclass', async () => {
            const instance = await Subclass.create("name", "desc");
            expect(instance).toBeInstanceOf(Subclass);
            expect(instance.name).toBe("name");
            expect(instance.description).toBe("desc");
        });
    });

    describe('initializeFromDatabase', () => {
        it('updates existing filter in database', async () => {
            const filter = { id: 1, save: jest.fn() };
            Filters.findOne.mockResolvedValue(filter);
            const instance = await Subclass.create("name", "desc");
            expect(filter.description).toBe("desc");
            expect(filter.save).toHaveBeenCalled();
            expect(instance.internalId).toBe(1);
        });

        it('creates new filter in database', async () => {
            const filter = { id: 1 };
            Filters.findOne.mockResolvedValue(null);
            Filters.create.mockResolvedValue(filter);
            const instance = await Subclass.create("name", "desc");
            expect(Filters.create).toHaveBeenCalledWith({ name: "name", description: "desc" });
            expect(instance.internalId).toBe(1);
        });

        it('throws when database operation fails', async () => {
            Filters.findOne.mockRejectedValue(new Error("Database error"));
            await expect(Subclass.create("name", "desc")).rejects.toThrow("Database error");
        });
    });

    describe('filter', () => {
        it('throws when not implemented', async () => {
            const filter = await Subclass.create('name', 'description');
            expect(() => filter.filter()).toThrow(Error);
        });

        it('does not throw when implemented', async () => {
            class AnotherSubclass extends FilterBase {
                filter() { }
            }
            const filter = await AnotherSubclass.create('name', 'description');
            expect(() => filter.filter()).not.toThrow();
        });
    });

    describe('_countWords', () => {
        it('counts words in a string correctly', async () => {
            const instance = await Subclass.create("Test Filter", "Test Description");

            const testCases = [
                { input: "Hello, world!", expected: 2 },
                { input: "One word", expected: 2 },
                { input: "", expected: 0 },
                { input: "Extra     spaces", expected: 2 },
                { input: "Hello-world", expected: 1 },
            ];

            testCases.forEach(({ input, expected }) => {
                expect(instance._countWords(input)).toBe(expected);
            });
        });
    });

    describe('constructor', () => {
        it('throws when directly invoked', () => {
            expect(() => new FilterBase("name", "desc")).toThrow(TypeError);
        });
    });
});
