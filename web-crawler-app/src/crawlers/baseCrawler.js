'use strict';

class BaseCrawler {
    constructor(httpClient) {
        if (new.target === BaseCrawler) {
            throw new TypeError("Cannot construct CrawlerService instances directly");
        }
        this.httpClient = httpClient;
    }

    async crawl(url) {
        throw new Error('You have to implement the method crawl!');
    }
}

module.exports = BaseCrawler;