const express = require('express');
const app = express();
const morgan = require('morgan');
const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middleware/errorHandlers.js');
const { notFoundHandler } = require('./utils/middleware/notFoundHandler.js');
const satellites = require('./routes/satellites');
const PORT = process.env.PORT || 8080;

// Body parser
app.use(express.json());

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
satellites(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
