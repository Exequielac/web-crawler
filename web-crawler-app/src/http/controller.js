'use strict';

const httpService = require('../services/httpService');
const { UsageData } = require('../db/database');
const FilterFactory = require('../filters/FilterFactory');
const HackerNewsCrawler = require('../crawlers/hackerNewsCrawler');
const appConfig = require('../config/appConfig');

const httpInstance = new httpService();

class AppController {
    static async getEntries(req, res, next) {
        try {
            const crawler = new HackerNewsCrawler(
                httpInstance,
                appConfig.url,
                appConfig.entries,
            );
            const entries = await crawler.crawl();

            res.json(entries);
        } catch (err) {
            next(err);
        }
    }

    static async filterEntries(req, res, next, filterName) {
        try {
            const crawler = new HackerNewsCrawler(
                httpInstance,
                appConfig.url,
                appConfig.entries,
            );
            const entries = await crawler.crawl();
            const filterInstance = FilterFactory.getFilterInstance(filterName);
            const filteredEntries = filterInstance.filter(entries);

            UsageData.create({
                timestamp: new Date(),
                filterId: filterInstance.internalId,
                result: filteredEntries,
            });

            res.json(filteredEntries);
        } catch (err) {
            next(err);
        }
    }

    static async filterByComments(req, res, next) {
        await AppController.filterEntries(
            req,
            res,
            next,
            appConfig.commentsFilter.name,
        );
    }

    static async filterByPoints(req, res, next) {
        await AppController.filterEntries(
            req,
            res,
            next,
            appConfig.pointsFilter.name,
        );
    }
}

module.exports = AppController;
