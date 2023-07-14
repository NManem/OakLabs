const path = require('path');
const express = require('express');
var cors = require('cors');

const app = express();
const PORT = 3000;

const apiRouter = require('./routes/api.js');
const usageRouter = require('./routes/usage.js');
const movesRouter = require('./routes/moves.js');

/**
 * handle parsing request body
 * basically handles our chunks of data and puts it into one body (like we did in last project)
 */
app.use(express.json());
app.use('*', express.urlencoded({ extended: true }));
app.use(cors());

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../client')));

// Default page for a get requet to the homepage
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the default API route',
  });
});

// Request for usage stats
app.use('/api/usage', usageRouter);
app.use('/api/moves', movesRouter);

// Request for api
app.use('/api', apiRouter);

// catch-all get requests and checks the react-router to see if it exists
app.use('*', (req, res) => {
  console.log('rendering html, redirecting to react router')
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
  // res.send('wrong')
});

// catch-all route handler for any requests to an unknown route
// app.use((req, res) => res.sendStatus(404)); //404 error is a YOU problem


// Global Error Handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;