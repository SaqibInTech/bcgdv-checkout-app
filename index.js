const express = require('express'),
      cors = require('cors')
      morgan = require('morgan'),
      errorhandler = require('errorhandler'),
      helmet = require('helmet')
      compression = require('compression')

const routes = require('./routes/index');
const isProduction = process.env.NODE_ENV === 'production'
const isTesting = process.env.NODE_ENV === 'test'

const app = express();

// apply middleware
app.use(cors())
app.use(helmet())
app.use(compression());

app.use(express.json());

// use errorhandler only in non-production mode
if (!isProduction) {
  app.use(errorhandler())
}

// use morgan combined logs in non-testing mode
if (!isTesting) {
  app.use(morgan('combined'))
}

app.use(routes)

// catch 404
app.use((req, res, next) => {
    var err = new Error('Route not found')
    err.status = 404
    next(err)
});

/// error handlers

// development error handler will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack)

    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    })
  })
}

// production error handler, no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  })
})

// for unit testing 
module.exports = app
