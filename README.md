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

### Inside the devcontainer



## Data Storage

**WIP**

## Note

When counting words in the title, only spaced words are considered and symbols are excluded. For instance, the phrase “This is - a self-explained example” is counted as having 5 words.