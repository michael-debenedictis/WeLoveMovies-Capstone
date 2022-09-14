const service = require('./theaters.service.js');

const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

async function list(req, res, next) {
  const data = await service.list();
  res.json({
    data
  })
}

module.exports = {
  list: asyncErrorBoundary(list)
}