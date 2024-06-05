'use strict';

const CrawlerService = require('./crawlerService');

describe('CrawlerService', () => {
    test('should not be able to be instantiated directly', () => {
        expect(() => new CrawlerService()).toThrow(TypeError);
    });

    test('should require crawl method to be implemented', async () => {
        class TestCrawlerService extends CrawlerService {
            constructor() {
                super(null);
            }
        }

        const service = new TestCrawlerService();
        await expect(service.crawl()).rejects.toThrow(Error);
    });

    test('should not throw error when crawl method is implemented', async () => {
        class TestCrawlerService extends CrawlerService {
            constructor() {
                super(null);
            }

            async crawl() {
                return [];
            }
        }

        const service = new TestCrawlerService();
        await expect(service.crawl()).resolves.toEqual([]);
    });
});