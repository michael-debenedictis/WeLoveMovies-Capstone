const service = require("./movies.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

async function idExists(req, res, next) {
  const movieId = req.params.movieId;
  const found = await service.read(movieId)
  if (found.length > 0) {
    next();
  } else {
    next({ status: 404, message: "Movie cannot be found." });
  }
}

async function list(req, res, next) {
  const isShowing = req.query.is_showing;
  const data = await service.list(isShowing);
  res.json({
    data
  });
}

async function read(req, res, next) {
  const movieId = req.params.movieId;
  const [ data ] = await service.read(movieId);
  res.json({
    data
  });
}

async function readReviews(req, res, next) {
  const movieId = req.params.movieId;
  const data = await service.readReviews(movieId);
  res.json({
    data
  });
}

async function readTheaters(req, res, next) {
  const movieId = req.params.movieId;
  const data = await service.readTheaters(movieId);
  res.json({
    data
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(idExists), asyncErrorBoundary(read)],
  readReviews: asyncErrorBoundary(readReviews),
  readTheaters: asyncErrorBoundary(readTheaters)
};
