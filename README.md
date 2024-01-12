# Hugging Face Model Scraper

## Overview

This Node.js application is designed to scrape model data from the Hugging Face API. It fetches information about various machine learning models hosted on the Hugging Face platform and saves this data in a structured JSON format.

## Features

- Fetches data from the Hugging Face API.
- Processes and formats the data into a readable JSON format.
- Saves the processed data in a file named `modelData.json`

## Prerequisites

- Node.js (version 20 or higher).
- An API key from Hugging Face.

## Getting Started

### Obtain Hugging Face API Key

You need to have an API key from Hugging Face to use this application. To get the API key:

1. Go to [Hugging Face Tokens Page](https://huggingface.co/settings/tokens).
2. Create a `Model Lookup READ` token.
3. Save this token, as it will be used to authenticate API requests.

### Set Environment Variables

Before running the application, set the Hugging Face API key as an environment variable:

Copy the .env.example file to a new file named .env in the same directory.
Update the .env file with your Hugging Face API key and any other required environment variables.

### Run the Application

Run the application using Node.js:

```
yarn start
```
