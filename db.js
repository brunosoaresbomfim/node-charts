const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '373571',
      database : 'db'
    }
  });

module.exports = db;
