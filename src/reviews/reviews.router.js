const router = require("express").Router({ mergeParams: true });
const controller = require('./reviews.controller');
const methodNotAllowed = require('../errors/methodNotAllowed.js');

router.route('/:reviewId')
  .put(controller.updateReview)
  .delete(controller.deleteReview)
  .all(methodNotAllowed)

module.exports = router;