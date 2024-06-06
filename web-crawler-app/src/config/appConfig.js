const appConfig = {
    url: 'https://news.ycombinator.com/',
    entries: 30,
    serverPort: 4200,
    commentsFilter: {
        name: 'comments',
        description: 'Filter entries by comments'
    },
    pointsFilter: {
        name: 'points',
        description: 'Filter entries by points'
    }
};

module.exports = appConfig;