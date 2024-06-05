'use strict';

const axios = require('axios');

class HttpService {
    async getHTML(url) {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch HTML from ${url}`, error);
            throw error;
        }
    }
}

module.exports = HttpService;
