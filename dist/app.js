"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("@babel/polyfill");

var _multer = _interopRequireDefault(require("multer"));

var model = _interopRequireWildcard(require("./models.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("@babel/polyfill");

var express = require('express');

var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8001;

var Cors = require('cors');

// middle ware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); // parse form data client

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use('/images', express["static"]('images'));

var errHandler = function errHandler(err, req, res, next) {
  if (err instanceof _multer["default"].MulterError) {
    return res.json({
      error: "upload failed",
      message: err.message
    });
  }
};

app.use(errHandler);
app.use(Cors()); // add all the routes

var users = require('./routes/users.js');

var apartment = require('./routes/apartments.js');

var reviews = require('./routes/reviews.js');

app.use('/users', users);
app.use('/apartments', apartment);
app.use('/reviews', reviews);
app.get('/', function (req, res) {
  res.send('Welcome to the Revie Platform');
});
model.connection.sync({
  logging: console.log // force:true

}).then(function () {
  // prefill the reviewtype table with the reviewtypes
  // list of types that can be reviewed
  var reviewTypeList = ['landlord', 'environment', 'apartment', 'amenities'];
  model.reviewType.findAll().then(function (dbReviewTypeList) {
    // get a list of all the review type target
    var dbReviewTypeTargetList = dbReviewTypeList.map(function (type) {
      return type.getDataValue('target');
    }); // check if any review type is absent in database, add it

    reviewTypeList.forEach(function (type) {
      // add each type to the database
      // check if review type not already in database
      if (dbReviewTypeTargetList.includes(type) === false) {
        // add review type to database
        model.reviewType.create({
          target: type
        }).then(function (theType) {
          console.log("type ".concat(type, " added"));
        });
      }
    });
  });
}).then(function () {
  console.log('Connection has been established successfully.');
})["catch"](function (error) {
  console.error('Unable to connect to the database:', error);
});
app.listen(port, function () {
  console.log("Running server on port ".concat(port));
});
//# sourceMappingURL=app.js.map