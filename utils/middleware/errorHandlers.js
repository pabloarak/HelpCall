const boom = require('@hapi/boom');
const { config } = require('../config/index');

const withErrorStack = (err, stack) => {
  if (config.dev) {
    return {
      err,
      stack,
    };
  }
  return err;
};

const logErrors = (err, req, res, next) => {
  console.log(err);
  next(err);
};

const wrapErrors = (err, req, res, next) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
};

const errorHandler = (err, req, res, next) => {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
};

module.exports = {
  logErrors,
  errorHandler,
  wrapErrors,
};
