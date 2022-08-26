const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const logger = require('morgan');
const cors = require('cors')
require("dotenv").config();
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const apiDocs = require('./docs/apiDocs.json')
const swaggerSpec = {
    definition: 
        apiDocs
    ,
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const reposRouter = require('./routes/repos');

const { dbConnection } = require("./db/db");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(
    session({
      secret: "apiCambalache",
      resave: true,
      saveUninitialized: true,
    })
  );

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/repos', reposRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)))

dbConnection();

module.exports = app;
