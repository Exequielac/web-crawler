'use strict';

const http = require('http');
const express = require('express');
const db = require('./db/database');
const router = require('./http/router');
const appConfig = require('./config/appConfig');

const FilterFactory = require('./filters/FilterFactory');
const FilterByComments = require('./filters/FilterByComments');
const FilterByPoints = require('./filters/FilterByPoints');

const app = express();
app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const server = http.createServer(app);

const initializeFilters = async (filtersConfig) => {
    for (const filterConfig of filtersConfig) {
        const { FilterClass, args, name } = filterConfig;
        await FilterFactory.initializeFilter(FilterClass, args, name);
    }
};

const startServer = async () => {
    try {
        // Db auth and initialization
        await db.authenticateDB();
        await db.createTablesIfNotExist();

        // Filters initialization
        const filtersConfig = [
            { FilterClass: FilterByComments, args: Object.values(appConfig.commentsFilter), name: appConfig.commentsFilter.name },
            { FilterClass: FilterByPoints, args: Object.values(appConfig.pointsFilter), name: appConfig.pointsFilter.name }
        ];
        await initializeFilters(filtersConfig);

        const port = appConfig.port || 4200;
        server.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
    }
};

startServer();
