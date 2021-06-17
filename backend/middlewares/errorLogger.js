module.exports = (err, req, res, next) => {
  console.error(err.message);
  next(err);
};
