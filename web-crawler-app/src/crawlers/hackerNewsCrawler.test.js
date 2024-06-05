'use strict';

const HackerNewsCrawler = require('./hackerNewsCrawler');
const httpService = require('../services/httpService');

jest.mock('../services/httpService', () => ({
    getHTML: jest.fn(),
}));

describe('HackerNewsCrawler', () => {
    let crawler;

    beforeEach(() => {
        crawler = new HackerNewsCrawler(httpService, 'dummyUrl', 3);
    });

    it('should construct with provided maxEntries', () => {
        const customCrawler = new HackerNewsCrawler(httpService, 'dummyUrl', 50);
        expect(customCrawler.maxEntries).toBe(50);
    });

    describe('_extractFirstNumberFromText', () => {
        it('should return the first number from the text', () => {
            expect(crawler._extractFirstNumberFromText('123 abc 456')).toBe(123);
        });

        it('should return 0 if no number in the text', () => {
            expect(crawler._extractFirstNumberFromText('abc')).toBe(0);
        });

        it('should return 0 if text is null or empty', () => {
            expect(crawler._extractFirstNumberFromText(null)).toBe(0);
            expect(crawler._extractFirstNumberFromText('')).toBe(0);
        });
    });

    describe('crawl', () => {
        it('should return entries from the page when entries are lower than maxEntries', async () => {
            const htmlMock = require('/workspace/web-crawler-app/data/hackerNewsMock2Entries');
            httpService.getHTML.mockResolvedValue(htmlMock);

            const entries = await crawler.crawl();

            // Check that the entries are as expected
            expect(entries).toEqual([
                {
                    number: 1,
                    title: 'Boeing Starliner launches first crewed mission',
                    points: 313,
                    comments: 297 
                },
                {
                    number: 2,
                    title: 'Vulkan1.3 on the M1 in one month',
                    points: 364,
                    comments: 123 
                },
            ]);
        });

        it('should return entries from the page when entries are higher than maxEntries', async () => {
            const htmlMock = require('/workspace/web-crawler-app/data/hackerNewsMock4Entries');
            httpService.getHTML.mockResolvedValue(htmlMock);

            const entries = await crawler.crawl();

            // Check that the entries are as expected
            expect(entries).toEqual([
                {
                    number: 1,
                    title: 'Boeing Starliner launches first crewed mission',
                    points: 313,
                    comments: 297 
                },
                {
                    number: 2,
                    title: 'Vulkan1.3 on the M1 in one month',
                    points: 364,
                    comments: 123 
                },
                {
                    number: 3,
                    title: 'Employees Who Stay in Companies Longer Than Two Years Get Paid 50% Less (2014)',
                    points: 197,
                    comments: 147 
                }
            ]);
        });

        it('should throw an error if fetching the HTML fails', async () => {
            httpService.getHTML.mockRejectedValue(new Error('Network error'));

            await expect(crawler.crawl()).rejects.toThrow('Network error');
        });
    });
});