const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const clientRouter = require("./routes/clientRoute");
const recordRouter = require("./routes/recordRoute");
const rentalRouter = require("./routes/rentalRoute");

const clientApiRouter = require("./routes/api/ClientApiRoute");
const recordApiRouter = require("./routes/api/RecordApiRoute");
const rentalApiRouter = require("./routes/api/RentalApiRoute");

const sequelizeInit = require("./config/sequelize/init");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

sequelizeInit()
    .catch(err => {
        console.log(err)
    });

app.use("/api/clients", clientApiRouter);
app.use("/api/records", recordApiRouter);
app.use("/api/rentals", rentalApiRouter);

app.use('/', indexRouter);
app.use("/clients", clientRouter);
app.use("/records", recordRouter);
app.use("/rentals", rentalRouter);

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

module.exports = app;
