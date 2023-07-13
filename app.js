var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors = require("cors");
const fs = require('fs');
const logger_pino = require('./lib/logger');

const uiPath = path.join(__dirname, 'frontend', 'semntinn-frontend');
var app = express();
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middlewares are listed below
app.use('/api', require('./middleware/secure'));


// routes are listed below
app.use('/api/user', require('./routes/user'));

// catch api errors
app.use('/api', require('./middleware/error'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// frontend handler
app.use(express.static(uiPath));
app.get('*', function (req, res, next) {
    try {
        fs.stat(uiPath + req.path, function (err) {
            if (err) {
                res.sendFile(uiPath + "/index.html", { uiPath });
            } else {
                res.sendFile(req.path, { uiPath });
            }
        })
    } catch (error) {
        logger_pino.error(error);
    }
});

module.exports = app;
