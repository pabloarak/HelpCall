const express = require('express');
const app = express();
const morgan = require('morgan');
const main = require('./routes/main');
const PORT = process.env.PORT || 8080;

// Body parser
app.use(express.json());

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Routes
app.use(main);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
