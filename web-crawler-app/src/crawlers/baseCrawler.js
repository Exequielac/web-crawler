'use strict';

class BaseCrawler {
    constructor(httpService, url) {
        if (new.target === BaseCrawler) {
            throw new TypeError("Cannot construct CrawlerService instances directly");
        }
        this.httpService = httpService;
        this.url = url;
    }

    async crawl() {
        throw new Error('You have to implement the method crawl!');
    }
}

module.exports = BaseCrawler;