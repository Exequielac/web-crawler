'use strict';

const httpService = require('../services/httpService');
const { UsageData } = require('../db/database');
const { commentsFilterInstance, pointsFilterInstance } = require('../filters');
const HackerNewsCrawler = require('../crawlers/hackerNewsCrawler');
const appConfig = require('../config/appConfig');

const httpInstance = new httpService();

class AppController {
    static async getEntries(req, res, next) {
        try {
            const crawler = new HackerNewsCrawler(httpInstance, appConfig.url, appConfig.entries);
            const entries = await crawler.crawl();

            res.json(entries);
        } catch (err) {
            next(err);
        }
    }

    static async filterEntries(req, res, next, filterInstance) {
        try {
            const crawler = new HackerNewsCrawler(httpInstance, appConfig.url, appConfig.entries);
            const entries = await crawler.crawl();
            const filteredEntries = filterInstance.filter(entries);

            UsageData.create(
                {
                    timestamp: new Date(),
                    filter: filterInstance.id,
                    result: filteredEntries,
                }
            )

            res.json(filteredEntries);
        } catch (err) {
            next(err);
        }
    }

    static async filterByComments(req, res, next) {
        await AppController.filterEntries(req, res, next, commentsFilterInstance);
    }

    static async filterByPoints(req, res, next) {
        await AppController.filterEntries(req, res, next, pointsFilterInstance);
    }
}

module.exports = AppController;
