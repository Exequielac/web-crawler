# Hacker News Web Crawler

This application is a web crawler built using Node.js. It's designed to scrape the first 30 entries from [Hacker News](https://news.ycombinator.com/), extracting key details such as rank, title, points, and the number of comments for each entry.

The application leverages Express.js to set up the HTTP server, providing a robust set of features for web applications. Data storage is handled by PostgreSQL, a powerful, open-source object-relational database system. This combination allows the application to efficiently retrieve, process, and store data.

Cheerio is used for web scraping, providing a fast, flexible, and lean implementation of core jQuery specifically for the server.

The application and database are containerized using Docker. The data scraped can be queried directly from the PostgreSQL database, providing easy access to the information.

## Features

- Filters entries with more than five words in the title, ordered by the number of comments.
- Filters entries with less than or equal to five words in the title, ordered by points.
- Stores usage data, including the request timestamp and the applied filter.

## How to Use

### Prerequisites

Before you begin, ensure you have installed the following:

- [Docker](https://www.docker.com/products/docker-desktop): A platform used to develop, ship, and run applications inside containers.
- [Visual Studio Code (VS Code)](https://code.visualstudio.com/download): A lightweight but powerful source code editor.
- [Docker extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker): An extension that makes it easy to build, manage, and deploy containerized applications from Visual Studio Code.

### Initial setup

After cloning this repository, you'll find a `.devcontainer` folder. This folder contains configuration files for the application and database Docker images. Here's a brief overview of the files in this folder:

- `.example.env`: This file provides a template of the environment variables needed for the application. All the variables listed in this file are required for a successful setup.
- `devcontainer.json`: This file contains configuration for the development container. It specifies the Docker image or Dockerfile for the development environment, and sets up any necessary services, settings, and extensions.
- `docker-compose.yml`: This file defines the services that make up your app (in this case, the application and the database) so they can be run together in an isolated environment.
- `Dockerfile`: This file contains the instructions for building the Docker image for the application.

The application requires the following environment variables to be set (included in `.example.env`):

- `POSTGRES_USER`: The username for the PostgreSQL database.
- `POSTGRES_PASSWORD`: The password for the PostgreSQL database.
- `POSTGRES_DB`: The name of the PostgreSQL database.
- `APP_SERVER_PORT`: The port that the Express.js server will listen on.
- `FORWARD_PORT`: The host port that will be forwarded to the `APP_SERVER_PORT` in the Docker container.

To quickly set up your environment variables, you can make a copy of the `.example.env` file and rename it to `.env`. You can do this using the following command:

```bash
cp .example.env .env
```

Once you've completed the setup, you're ready to open the development container. In Visual Studio Code, use the "Reopen in Container" option provided by the Docker extension. This will rebuild the Docker image and start the development environment inside the container.

**Important**: The PostgreSQL database is currently configured for persistent storage. This means that data will persist even after the container is stopped. If you prefer to have an ephemeral database (i.e., data does not persist after the container is stopped), you should remove the `volumes` section from the `db` service in the `docker-compose.yml` file.

### Working Inside the DevContainer

#### Installing Dependencies

Once inside the DevContainer, navigate to the project directory. Install the necessary dependencies using npm's clean install command:

```bash
npm ci
```

#### Configuring the Application

The behavior of the application can be customized in the `web-crawler-app/src/config/appConfig.js` file. This configuration file allows you to specify the HackerNews URL to crawl and the number of entries to fetch. The variables are:

- `url`: The URL of the HackerNews page to crawl.
- `entries`: The number of entries to fetch from the page.

This configuration allows the application to crawl different pages from HackerNews, such as the second page.

**NOTE**: The application is specifically designed to work with HackerNews. If you specify a different website, it may result in unexpected behavior.

#### Starting the Application

The application uses PM2, a production process manager for Node.js applications. To start the application, use the following npm command:

```bash
npm run start
```
This command will start the application in the background, managed by PM2.

#### API endpoints

The application exposes the following API endpoints:

- `GET /entries`: Fetches all entries from the HackerNews URL.
- `GET /filters/comments`: Fetches entries from the HackerNews URL, filters those with more than five words in the title, and orders the result by the number of comments.
- `GET /filters/points`: Fetches entries from the HackerNews URL, filters those with five words or fewer in the title, and orders the result by points.

You can test the API endpoints using `curl` within the development container. Replace `<APP_SERVER_PORT>` with the actual port number where your application is running:

```bash
# Fetch all entries
curl -X GET http://localhost:<APP_SERVER_PORT>/entries

# Fetch entries filtered by comments
curl -X GET http://localhost:<APP_SERVER_PORT>/filters/comments

# Fetch entries filtered by points
curl -X GET http://localhost:<APP_SERVER_PORT>/filters/points
```

Alternatively, you can test the API endpoints from your host machine. Make sure to replace `<FORWARD_PORT>` with the actual port number that you've forwarded to the Docker container:

```bash
# Fetch all entries
curl http://localhost:<FORWARD_PORT>/entries

# Fetch entries filtered by the number of comments
curl http://localhost:<FORWARD_PORT>/filters/comments

# Fetch entries filtered by points
curl http://localhost:<FORWARD_PORT>/filters/points
```

#### Running Tests

The application uses Jest for testing, following the Test-Driven Development (TDD) methodology. To execute the tests, use the following command:

```bash
npm run test
```

#### Stopping the Server

When you're done with your development work, you can stop the server using the following command:

```bash
npm run stop
```

This command will stop the Node.js server that's running in the background via PM2.

## Data Storage

The application uses Sequelize, a promise-based Node.js ORM, for data storage. The data model is defined in two parts:

- `Filters`: This model represents the filters that can be applied to the HackerNews entries. It has two fields:
  - `name`: A unique string that represents the name of the filter.
  - `description`: A string that provides a description of what the filter does.

- `UsageData`: This model represents the usage data of the filters. It has three fields:
  - `timestamp`: A date that represents when the filter was used.
  - `filterId`: An integer that references the id of the filter used. This creates a foreign key relationship with the `Filters` model.
  - `result`: A JSON object that stores the result of applying the filter.

The `Filters` and `UsageData` models are stored in the `filters` and `usage_data` tables in the database, respectively.

To inspect the `usage_data` table, you can access the PostgreSQL database within the Docker container. This allows you to directly query and view the data stored in the table.

## Future Enhancements

- Implement a new API endpoint `/usage` to retrieve information from the `usage_data` table.
- Enhance the `usage_data` table by adding a new column to record the time taken by each crawl operation.
- Develop a user-friendly frontend interface for easier interaction with the application.
- Integrate the application with a Continuous Integration (CI) environment such as GitHub Actions for automated testing.
- Deploy the application on a public server.
- Establish a Continuous Deployment (CD) pipeline for streamlined updates and releases.

## Note

When counting words in the title, only spaced words are considered and symbols are excluded. For instance, the phrase “This is - a self-explained example” is counted as having 5 words.