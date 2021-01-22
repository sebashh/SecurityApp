const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const redis = require('./public/javascripts/redis.js');
const io = require('socket.io')(server);

const indexRouter = require('./routes/index');
const statisticsRouter = require('./routes/statistics');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/redisData', redis);
app.use('/', indexRouter);
app.use('/statistics', statisticsRouter);

server.listen(5000, () => console.log(`Server is up and running on http://localhost:${process.env.PORT}`));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

redis.subscriber.psubscribe('coords*');

redis.subscriber.on("pmessage", (pattern, channel, message) => {
  try {
    console.log("Coords received: "+ message + channel);
    io.sockets.emit('coords', JSON.parse(message), channel);
  } catch(e) {
    return undefined;
  }
});

// const socket = socketIOClient({path: "/socket.io"});
// require('./routes/')(app, io)

// redis.subscriber.subscribe("coords", err => {
//   redis.publisher.publish("coords", 5);
// });
//
// redis.subscriber.on("message", (channel, message) => {
//   console.log("bla", + message, channel);
// });
// const message = "hello";
//   io.sockets.emit('redisData', message);

module.exports = app;
