const NotFoundError = require('./NotFountError');
const ConflictError = require('./ConflictError');
const BadRequestError = require('./BadRequestError');
const ForbiddenError = require('./ForbiddenError');
const UnauthorizedError = require('./UnauthorizedError');

module.exports = {
  NotFoundError,
  ConflictError,
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
};
