'use strict';

const http = require('http');
const express = require('express');
const db = require('./db/database');
const router = require('./http/router');
const appConfig = require('./config/appConfig');

const app = express();
app.use(router);

const server = http.createServer(app);

const startServer = async () => {
    try {
        await db.authenticateDB();
        await db.createTablesIfNotExist();

        const port = appConfig.port || 4200;
        server.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
    }
};

startServer();
