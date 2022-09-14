const service = require('./reviews.service.js');

const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

async function idExists(req, res, next) {
  const reviewId = req.params.reviewId;
  const found = await service.read(reviewId);
  if (found.length > 0) {
    next();
  } else {
    next({ status: 404, message: "Review cannot be found." })
  }
}

async function updateReview(req, res, next) {
  const reviewId = req.params.reviewId;
  const { data = {} } = req.body;
  const content = data.content
  const dataResponse = await service.updateReview(reviewId, content)
  res.json({
    data: dataResponse
  })
}

async function deleteReview(req, res, next) {
  const reviewId = req.params.reviewId;
  service.deleteReview(reviewId);
  res.status(204).json({
    data: `204 No Content`
  })
}

module.exports = {
  updateReview: [asyncErrorBoundary(idExists), asyncErrorBoundary(updateReview)],
  deleteReview: [asyncErrorBoundary(idExists), asyncErrorBoundary(deleteReview)]
}