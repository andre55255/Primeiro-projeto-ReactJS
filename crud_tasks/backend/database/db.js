const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'galoucura',
        database: 'crud_tasks'
    }
});

module.exports = knex;