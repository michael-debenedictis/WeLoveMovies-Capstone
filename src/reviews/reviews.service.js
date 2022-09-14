const knex = require("../db/connection");
const addCritic = require('../utils/add-critic.js')

async function updateReview(reviewId, content) {
  await knex('reviews')
    .select('*')
    .where( {review_id: reviewId} )
    .update(content, content)

  const review = await knex('reviews')
    .select('*')
    .where( {review_id: reviewId} )
  
  const criticId = review[0].critic_id

  const criticObj = await knex('critics')
    .select('*')
    .where( {critic_id: criticId})
  
  review[0].critic = criticObj[0]

  return review[0]
}

async function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId });
}

async function deleteReview(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).del();
}

module.exports = {
  read,
  updateReview,
  deleteReview,
};
