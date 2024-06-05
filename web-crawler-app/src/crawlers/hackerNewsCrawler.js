'use strict';

const cheerio = require('cheerio');
const BaseCrawler = require('./baseCrawler');

class HackerNewsCrawler extends BaseCrawler {
    constructor(httpService, maxEntries) {
        super(httpService);
        this.maxEntries = maxEntries;
    }

    async crawl(url) {
        let html;
        try {
            html = await this.httpService.getHTML(url);
        } catch (error) {
            console.error(`Failed to fetch HTML from ${url}`, error);
            throw error;
        }

        // Parse the HTML and extract the entries
        const $ = cheerio.load(html);
        const entries = Array.from($('.athing')).map((element, index) => {
            if (index >= this.maxEntries) return null; // limit entries
          
            const number = this._extractFirstNumberFromText($(element).find('.rank').text());
            const title = $(element).find('span.titleline > a').first().text().trim();
            const subtextElement = $(element).next().find('.subtext');
            const points = this._extractFirstNumberFromText(subtextElement.find('.score').text());
            const comments = this._extractFirstNumberFromText(subtextElement.find('a').last().text());
            return { number, title, points, comments };
          }).filter(Boolean); // remove null entries

        return entries;
    }

    _extractFirstNumberFromText(text) {
        if (!text) {
            return 0;
        }

        const numbers = text.match(/-?\d+/g);
        const firstNumber = numbers ? parseInt(numbers[0], 10) : 0;
        return isNaN(firstNumber) ? 0 : firstNumber;
    }
}

module.exports = HackerNewsCrawler;
