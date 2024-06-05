'use strict';

class CrawlerService {
    constructor(httpClient) {
        if (new.target === CrawlerService) {
            throw new TypeError("Cannot construct CrawlerService instances directly");
        }
        this.httpClient = httpClient;
    }

    async crawl(url) {
        throw new Error('You have to implement the method crawl!');
    }
}

module.exports = CrawlerService;