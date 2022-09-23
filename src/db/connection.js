const environment = process.env.NODE_ENV || 'development' //was development
console.log('url: ', process.env.DATABASE_URL);
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);

module.exports = knex;