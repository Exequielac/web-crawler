'use strict';

const BaseCrawler = require('./baseCrawler');

describe('CrawlerService', () => {
    it('should not be able to be instantiated directly', () => {
        expect(() => new BaseCrawler()).toThrow(TypeError);
    });

    it('should require crawl method to be implemented', async () => {
        class TestCrawler extends BaseCrawler {
            constructor() {
                super(null);
            }
        }

        const service = new TestCrawler();
        await expect(service.crawl()).rejects.toThrow(Error);
    });

    it('should not throw error when crawl method is implemented', async () => {
        class TestCrawler extends BaseCrawler {
            constructor() {
                super(null);
            }

            async crawl() {
                return [];
            }
        }

        const service = new TestCrawler();
        await expect(service.crawl()).resolves.toEqual([]);
    });
});