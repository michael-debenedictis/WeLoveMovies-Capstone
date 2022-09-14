const knex = require("../db/connection");
const addCritic = require('../utils/add-critic.js')

async function list(isShowing) { //isShowing should be a boolean determining whether to only show movies that are currently showing
  if (isShowing) {
    return knex('movies')
      .join('movies_theaters', 'movies_theaters.movie_id', 'movies.movie_id')
      .select('movies.*')
      .where( {is_showing: true} )
      .distinct()
  }
  return knex("movies").select("*");
}

async function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId });
}

async function readReviews(movieId) {
  const criticsArray = await knex('critics')
    .join('reviews', 'reviews.critic_id', 'critics.critic_id')
    .select('critics.*')
    .where( {'reviews.movie_id': movieId})

  const reviewsArray = await knex('reviews')
    .join('critics', 'critics.critic_id', 'reviews.critic_id')
    .select('reviews.*')
    .where( {'reviews.movie_id': movieId} )
  
  return addCritic(reviewsArray, criticsArray)
}

async function readTheaters(movieId) {
  return knex('movies')
    .join('movies_theaters', 'movies_theaters.movie_id', 'movies.movie_id')
    .join('theaters', 'movies_theaters.theater_id', 'theaters.theater_id')
    .select('theaters.*', 'movies_theaters.is_showing', 'movies.movie_id')
    .where( {'movies_theaters.is_showing': true} )
    .where( {'movies.movie_id': movieId} )
}

module.exports = {
  list,
  read,
  readReviews,
  readTheaters
};
