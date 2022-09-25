const environment = 'development'
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);
console.log('hi', knex.client)

module.exports = knex;