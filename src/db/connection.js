const environment = process.env.NODE_ENV || 'development' //was development
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);

module.exports = knex;