require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
// const logger = require('./logger');
const errorHandler = require('./errorHandler');
const { v4: uuid } = require('uuid');
const barberRouter = require('./barbers/barber-router');
// const validateBearerToken = require('./validateBearerToken');

const app = express();
const bodyParser = express.json();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(cors());
// app.use(validateBearerToken);
app.use(morgan(morganOption));
app.use(helmet());

app.use('/api/barbers', barberRouter);

app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

module.exports = app;
