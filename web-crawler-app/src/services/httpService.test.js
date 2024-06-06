'use strict';

const HttpService = require('./httpService');
const nock = require('nock');

describe('HttpService', () => {
    let httpService;

    beforeEach(() => {
        httpService = new HttpService();
    });

    it('returns the correct HTML when getHTML is called with a valid URL', async () => {
        const expectedHTML = '<html><body>Hello, world!</body></html>';
        nock('https://example.com').get('/').reply(200, expectedHTML);

        const actualHTML = await httpService.getHTML('https://example.com/');

        expect(actualHTML).toBe(expectedHTML);
    });

    it('throws an error with a specific message when getHTML is called and the request fails', async () => {
        const errorMessage = 'something awful happened';
        nock('https://example.com').get('/').replyWithError(errorMessage);

        await expect(
            httpService.getHTML('https://example.com/'),
        ).rejects.toThrow(errorMessage);
    });

    it('throws an error when getHTML is called and the server responds with a 404 status', async () => {
        nock('https://example.com').get('/').reply(404);

        await expect(
            httpService.getHTML('https://example.com/'),
        ).rejects.toThrow();
    });
});
