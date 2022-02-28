const express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  cors = require('cors'),
  helmet = require('helmet'),
  books = require('./src/routes');


const app = express();
const corsOption = {
  origin: '*',
  optionsSuccessStatus: 200
}

// view engine setup
module.exports = (app) => {
  app.use(logger('dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(corsOption));
  app.use(helmet())

  // Specify the routes
  app.use('/api/books', books);

  return app
}

