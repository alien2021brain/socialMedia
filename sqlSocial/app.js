var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var uploadRouter = require('./routes/upload.js');
var postRouter = require('./routes/posts.js');

require('dotenv').config();
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth.js');
var commentRoute = require('./routes/comments.js');
var likesRoute = require('./routes/likes.js');
var followRouter = require('./routes/follower.js');

var app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
// app.use(cors());
// app.use((req, res, next) => {

//   res.header('Access-Control-Allow-Credentials', true);
//   // Add other headers if needed
//   next();
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// used for reading req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// we share static file
app.use(express.static(path.join(__dirname, 'public')));

// api
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/uploads', uploadRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRoute);
app.use('/likes', likesRoute);
app.use('/followers', followRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT, () => {
  console.log(`server started on http://localhost:${process.env.PORT}`);
});

module.exports = app;
