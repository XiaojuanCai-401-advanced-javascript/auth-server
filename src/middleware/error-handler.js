function errorHandler (err, req, res, next) {
  if (err)
    res.status(500).json(err.message);
  else 
    next(req, res, next);
}

module.exports = errorHandler;