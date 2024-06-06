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
const HackerNewsCrawler = require('../crawlers/hackerNewsCrawler');

describe('AppController', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.get('/entries', AppController.getEntries);
    });

    it('getEntries returns entries from crawler', async () => {
        const mockEntries = [{ id: 1 }, { id: 2 }];
        HackerNewsCrawler.prototype.crawl = jest.fn().mockResolvedValue(mockEntries);

        const response = await request(app).get('/entries');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockEntries);
    });
});
