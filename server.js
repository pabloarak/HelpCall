const express = require('express');
const app = express();
const morgan = require('morgan');
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers.js')
const { notFoundHandler } = require('./utils/middleware/notFoundHandler.js')
const main = require('./routes/main');
const PORT = process.env.PORT || 8080;

// Body parser
app.use(express.json());

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// Routes
app.use(main);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
