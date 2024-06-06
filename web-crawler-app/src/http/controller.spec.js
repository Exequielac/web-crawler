'use strict';

const mockDatabase = {
    UsageData: {
        create: jest.fn(),
    },
};

const mockFilters = {
    commentsFilterInstance: {
        filter: jest.fn(),
    },
    pointsFilterInstance: {
        filter: jest.fn(),
    },
};

jest.mock('../db/database', () => mockDatabase);
jest.mock('../filters', () => mockFilters);
jest.mock('../crawlers/hackerNewsCrawler');

const request = require('supertest');
const express = require('express');
const AppController = require('./controller');
const { UsageData } = require('../db/database');
const { commentsFilterInstance, pointsFilterInstance } = require('../filters');
const HackerNewsCrawler = require('../crawlers/hackerNewsCrawler');

describe('AppController', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.get('/entries', AppController.getEntries);
        app.get('/filter/comments', AppController.filterByComments);
        app.get('/filter/points', AppController.filterByPoints);
    });

    it('getEntries returns entries from crawler', async () => {
        const mockEntries = [{ id: 1 }, { id: 2 }];
        HackerNewsCrawler.prototype.crawl = jest.fn().mockResolvedValue(mockEntries);

        const response = await request(app).get('/entries');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockEntries);
    });

    it('filterByComments filters entries and saves usage data', async () => {
        const mockEntries = [{ id: 1, comments: 10 }, { id: 2, comments: 5 }];
        const mockFilteredEntries = [{ id: 1, comments: 10 }];
        HackerNewsCrawler.prototype.crawl = jest.fn().mockResolvedValue(mockEntries);
        commentsFilterInstance.filter = jest.fn().mockReturnValue(mockFilteredEntries);
        UsageData.create = jest.fn();

        const response = await request(app).get('/filter/comments');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockFilteredEntries);
        expect(UsageData.create).toHaveBeenCalledWith({
            timestamp: expect.any(Date),
            filter: commentsFilterInstance.id,
            result: mockFilteredEntries,
        });
    });

    it('filterByPoints filters entries and saves usage data', async () => {
        const mockEntries = [{ id: 1, points: 10 }, { id: 2, points: 5 }];
        const mockFilteredEntries = [{ id: 1, points: 10 }];
        HackerNewsCrawler.prototype.crawl = jest.fn().mockResolvedValue(mockEntries);
        pointsFilterInstance.filter = jest.fn().mockReturnValue(mockFilteredEntries);
        UsageData.create = jest.fn();

        const response = await request(app).get('/filter/points');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockFilteredEntries);
        expect(UsageData.create).toHaveBeenCalledWith({
            timestamp: expect.any(Date),
            filter: pointsFilterInstance.id,
            result: mockFilteredEntries,
        });
    });
});
