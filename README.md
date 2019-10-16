# Elecex Coding Challenge 1

Thank you for your interest in working at Electricity Exchange. Before we proceed with more formal interviews, we ask that all candidates submit a coding challenge. The coding challenge is a foundational piece of our process and it's referenced later in our process during the technical interviews.

If at any point you have questions concerning the coding challenge and/or interview process, please do not hesitate to email developers@electricityexchange.ie

This challenge is intended to assess your coding ability in NodeJS.

You should not spend more than 2.5 - 3 hours on implementing the requirements.

## Prerequisites

- [NodeJS Installed](https://nodejs.org/en/download/)

## Available Commands

From the root directory there are a few commands that you can run
- _npm start_ - Run the project
- _npm run test_ - Run the test suite.

## Project Background

This project contains the beginnings of a simple REST api.

It consists of an SQLite database with two tables (Sites, Devices), and a simple webserver that currently exposes three RESTful endpoints.

You are expected to implement some new functionality, and ensure this new functionality is tested.

## Requirements

- Implement the endpoint that will make the tests defined in `test/tests/sites.spec.js` pass.
- Add an endpoint to retreve all active devices.
- Update all endpoints & verify that the parameters are of the correct type & valid, adding tests you feel are appropriate.

If you can think of any other changes that would improve the project, feel free to outline them in the improvements.txt file in this repo.

## Assessment

Your submission will be reviewed on the following points:

- Your ability to follow the requirements
- Implementation of the requirements
- Code readability and maintainability
- Test quality and coverage

## Project Overview

### Applicaton Codebase

- src/index.js
    This file initalises the webserver and database and starts the server listening on localhost:3000
- src/lib/Database.js
    This file is responsible for initalising the database & ensuring migrations are applied.

### Testware

- test/util/httpClient.js
    This file exposes a utility for making HTTP requests to the API when running your tests.
- test/tests/*.spec.js
    These files contain the integration tests for the implemented REST endpoints.

# Submission

To submit your coding challenge, commit all your changes to the `master` branch and run the following command:

```git bundle create coding-challenge.bundle HEAD master```

Email the the generated coding-challenge.bundle file to developers@electricityexchange.ie. We do our best to review and respond to submissions within 1-2 business days.

Thanks for taking the time to do this coding challenge and here's hoping we talk soon!