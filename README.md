# Northcoders News API

This project is an example of everything I have learned during the back end module of the Northcoders bootcamp. I have created an API which allows users to:

- Access news articles
- View, post and delete comments
- Vote articles up and down
- Run a range of queries on certain endpoints

A detailed view of all the features can be seen at the /api endpoint. Here you will find a list of all available endpoints and a description of each.

## Take a look

The API is hosted [HERE](https://nc-news-srco.onrender.com/api) so please take a look. Feel free to clone the repo and have a look at what is going on under the hood.

If you are having a look behind the scenes...

## Set Up

The project was built using **Node.js v21.5.0** and **NPM v10.2.4**. Instructions for installation can be found [HERE](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

The database for this project was built with **Postgres v16**. Instructions for installation can be found [HERE](https://www.postgresguide.com/setup/install/)

### Clone the repo

Once Postgres, Node and NPM are installed, please clone the repo. In the command line run the following:

```
git clone https://github.com/jamesraymetcalfe/nc-news
```

Now you can open the folder in your code editor.

### Installing dependencies

The project was created using the following dependencies:

- dotenv
- express
- husky
- pg
- pg-format
- supertest
- jest

To install these dependencies run:

```
npm install
```

## Database Set Up

The project was built with two databases. A test and development database.

### Adding .env files

To be able to set up and interact with the databases you will need to add two .env files. One will be named `.env.test` and the other `.env.development`. **It is important to name these as specified for the connection file to work properly.**

Inside the folders, add:

```
# Inside the test file

PGDATABASE=nc_news_test

# Inside the development file

PGDATABASE=nc_news
```

### Setting up the databases

To set up the databases, run:

```
npm run setup-dbs
```

This command can also work as a reset button. It will drop the databases and recreate them, if needed.

### Seeding the database

To seed the databases, run:

```
npm run seed
```

You are now ready to have an explore and play.

### Testing

The project was made using Test Driven Development practices and there are two test suites to be tried. One is for testing the utility functions and the other for testing integration.

To try out the tests, run:

```
# To run all tests

npm t

# To test the utility functions

npm t utils

# To test the utility functions

npm t app
```

By default, the seed file will run before each test to make sure the data is correctly structured and has not been altered by any previous tests.

Each test is split into `describe` and `test` blocks based on endpoints. This allows you to isolate or skip certain tests using `.only` or `.skip`. For example:

```
# To run or skip each test in a describe block

describe.only("/api/articles...")

describe.skip("api/topics...")

# To run or skip a single test

test.only("GET:200...")

test.skip("DELETE:204...")
```

That is all from me. Thanks for taking an interest in my project!
