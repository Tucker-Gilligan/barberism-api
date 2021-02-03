const app = require('./app');
const knex = require('knex');
const { PORT, DATABASE_URL } = require('./config');
require('dotenv').config();
const pg = require('pg');

pg.defaults.ssl =
  process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false;

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://${PORT}`);
});
