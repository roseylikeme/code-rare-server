require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")

const auth = require("./auth");

//Bring in Mongoose so we can communicate with MongoDB
const mongoose = require('mongoose')

// MONGODB CONNECTION
mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(process.env.PORT, () => {
        console.log(`App is running on port ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log(err)
})

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth.routes.js');
const usersRouter = require('./routes/user.routes.js');
const postsRouter = require('./routes/post.routes');
const likesRouter = require('./routes/like.routes');
const swaggerDocsRouter = require("./routes/swagger.routes");

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth.middleware)
app.use(swaggerDocsRouter);

app.use('/', indexRouter);
app.use('/auth', authRouter);

//tell our app to use our user routes and prefix them with /api
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/likes', likesRouter);

// error handling
app.use((err, req, res, next) => {
  // Some packages use 'status' instead of 'statusCode'
  if (err.status) {
    err.statusCode = err.status;
  }

  // Handle client errors (4xx)
  if (err.statusCode >= 400 && err.statusCode < 500) {
    if (err.statusCode === 401) {
      // Set the WWW-Authenticate header for 401 Unauthorized
      res.set(
        "WWW-Authenticate",
        `Bearer realm="POST your username and password to /auth/login to receive a token"`
      );
    }
    // Respond with the error message and status code
    res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode
    });
  } else {
    // Handle server errors (5xx)
    res.status(err.statusCode || 500);

    // Respond with the error message and status code
    res.json({
      message: err.message,
      statusCode: res.statusCode
    });

    // Log the error
    console.log(err);

    // Pass the error to the next middleware (e.g., logging middleware)
    req.error = err;
    next();
  }
});

module.exports = app;