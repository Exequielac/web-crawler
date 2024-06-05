'use strict';

class BaseCrawler {
    constructor(httpService) {
        if (new.target === BaseCrawler) {
            throw new TypeError("Cannot construct CrawlerService instances directly");
        }
        this.httpService = httpService;
    }

    async crawl(url) {
        throw new Error('You have to implement the method crawl!');
    }
}

module.exports = BaseCrawler;