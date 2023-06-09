
## Setting Up a Project

Technology used here node js, typescript, mongodb as database, mocha and chai is for testing.

Install the Node JS globally:

```
https://nodejs.org/
```
The application configuration of database:
This project is in development stage so in `.env.development` file you will get all set up is done for mongo atls database connection. If you want to use my database no need to do any configuration else you need to place your mongo atls database credentials. 

Install dependency before run this project:
Run `npm install` to install dependency of the project.

```
cd [PROJECT NAME]
npm install
```

Run the application:
You can visit the dev site in this link `http://localhost:5000`.

```
cd [PROJECT NAME]
npm start
```

Build the application:
Run `npm start` will autometically build the project. The build artifacts will be stored in the `dist/` directory.


Unit Test the application:
Run `npm test` to execute the unit tests via mocha and chai.

```
cd [PROJECT NAME]
npm test
```

## Thanks for your time ##