# Hacker News Web Crawler

This is a web crawler that scrapes the first 30 entries from [Hacker News](https://news.ycombinator.com/). It extracts the number, title, points, and number of comments for each entry.

## Features

- Filters entries with more than five words in the title, ordered by the number of comments.
- Filters entries with less than or equal to five words in the title, ordered by points.
- Stores usage data, including the request timestamp and the applied filter.

## How to Use

**WIP**

## Data Storage

**WIP**

## Note

When counting words in the title, only spaced words are considered and symbols are excluded. For instance, the phrase “This is - a self-explained example” is counted as having 5 words.