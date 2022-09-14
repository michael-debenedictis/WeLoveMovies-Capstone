const knex = require("../db/connection");
const reduceProperties = require('../utils/reduce-properties.js');

const reduceMovies = reduceProperties("theater_id", {
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ['movies', null, 'runtime_in_minutes'],
    title: ["movies", null, "title"],
  });

async function list() {
  return knex('theaters')
    .join('movies_theaters', 'movies_theaters.theater_id', 'theaters.theater_id')
    .join('movies', 'movies.movie_id', 'movies_theaters.movie_id')
    .select('theaters.*', 'movies.*')
    .then(reduceMovies)
}

module.exports = {
  list
}