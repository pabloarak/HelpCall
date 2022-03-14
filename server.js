const express = require('express');
const helmet = require('helmet');
const app = express();
const morgan = require('morgan');
const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middleware/errorHandlers.js');
const { notFoundHandler } = require('./utils/middleware/notFoundHandler.js');
const satellites = require('./routes/satellites');
const { config } = require('./config/index');

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet());

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

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}...`);
});
