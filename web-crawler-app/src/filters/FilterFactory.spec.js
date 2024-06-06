const FilterFactory = require('./FilterFactory');

describe('FilterFactory', () => {
    class MockFilter {
        static async create(...args) {
            return new MockFilter(...args);
        }
    }

    beforeEach(() => {
        // Clear filterInstances before each test
        FilterFactory.filterInstances = {};
    });

    it('initializeFilter correctly initializes a filter', async () => {
        await FilterFactory.initializeFilter(
            MockFilter,
            ['arg1', 'arg2'],
            'mockFilter',
        );
        expect(FilterFactory.filterInstances.mockFilter).toBeInstanceOf(
            MockFilter,
        );
    });

    it('getFilterInstance returns the correct filter instance', async () => {
        await FilterFactory.initializeFilter(
            MockFilter,
            ['arg1', 'arg2'],
            'mockFilter',
        );
        const filterInstance = FilterFactory.getFilterInstance('mockFilter');
        expect(filterInstance).toBeInstanceOf(MockFilter);
    });

    it('getFilterInstance throws an error when trying to get an uninitialized filter', () => {
        expect(() =>
            FilterFactory.getFilterInstance('uninitializedFilter'),
        ).toThrowError('Filter uninitializedFilter not initialized');
    });
});
