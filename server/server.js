const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

const apiRouter = require('./routes/api.js');

/**
 * handle parsing request body
 * basically handles our chunks of data and puts it into one body (like we did in last project)
 */
app.use(express.json());
app.use('*', express.urlencoded({ extended: true }));

// Default page for a get requet to the homepage
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the default API route',
  });
});

// Request for api
app.use('/api', apiRouter);



// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404)); //404 error is a YOU problem


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