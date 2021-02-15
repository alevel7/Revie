"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var apartmentCtrl = _interopRequireWildcard(require("../controllers/apartmentController.js"));

require("dotenv/config");

var models = _interopRequireWildcard(require("../models"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var reviewRoute = require('express').Router(); // import * as reviewCtrl from '../controllers/reviewController.js';


var upload = require('../dependencies.js').upload;

var verifyToken = require('../dependencies.js').verifyToken;

// post a review route
reviewRoute.post('/', upload.single('media'), verifyToken, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var requiredkeys, _i, _requiredkeys, key, apartment, newReview, mimetype;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            requiredkeys = ["comment", "ApartmentId", "reviewTypeId"]; // check if all required keys are present

            _i = 0, _requiredkeys = requiredkeys;

          case 2:
            if (!(_i < _requiredkeys.length)) {
              _context.next = 9;
              break;
            }

            key = _requiredkeys[_i];

            if (Object.keys(req.body).includes(key)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              'success': false,
              "data": "".concat(key, " is required but missing")
            }));

          case 6:
            _i++;
            _context.next = 2;
            break;

          case 9:
            if (!(req.body.comment === "" || req.body.ApartmentId === "" || req.body.reviewTypeId === "")) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              "success": false,
              "data": "required fields must not be blank"
            }));

          case 11:
            _context.prev = 11;
            _context.next = 14;
            return apartmentCtrl.getAnApartment(req.body.ApartmentId);

          case 14:
            apartment = _context.sent;

            if (apartment) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              'success': false,
              "data": "apartment with id ".concat(req.body.ApartmentId, " does not exist")
            }));

          case 17:
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](11);
            console.log(_context.t0);
            return _context.abrupt("return", res.json(_context.t0));

          case 23:
            _context.prev = 23;
            _context.next = 26;
            return models.review.create(_objectSpread(_objectSpread({}, req.body), {}, {
              UserId: req.userId
            }));

          case 26:
            newReview = _context.sent;

            if (!req.file) {
              _context.next = 32;
              break;
            }

            mimetype = 'image';

            if (req.file.mimetype.startsWith('video')) {
              mimetype = 'video';
            }

            _context.next = 32;
            return models.reviewAudioVideo.create({
              mediaType: mimetype,
              mediaUrl: req.file.filename,
              ReviewId: newReview.getDataValue('id')
            });

          case 32:
            return _context.abrupt("return", res.status(201).json({
              "success": true,
              "data": newReview
            }));

          case 35:
            _context.prev = 35;
            _context.t1 = _context["catch"](23);
            console.log(_context.t1);
            return _context.abrupt("return", res.json(_context.t1));

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[11, 19], [23, 35]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // delete a review route

reviewRoute["delete"]('/:id', verifyToken, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.params.id === undefined)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.status(422).json({
              "success": false,
              "data": "No id for review to be deleted specified"
            }));

          case 2:
            _context2.next = 4;
            return models.review.destroy({
              where: {
                id: req.params.id
              }
            });

          case 4:
            return _context2.abrupt("return", res.status(200).json({
              'success': true,
              "data": "review with id ".concat(req.params.id, " has been removed")
            }));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // patch a review route

reviewRoute.patch('/:id', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var current_review, data;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(req.params.id === undefined)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", res.status(422).json({
              "success": false,
              "data": "No id for review to be deleted specified"
            }));

          case 2:
            if (!req.body.helpful) {
              _context3.next = 17;
              break;
            }

            _context3.prev = 3;
            _context3.next = 6;
            return models.review.findOne({
              where: {
                id: req.params.id
              }
            });

          case 6:
            current_review = _context3.sent;
            // create a new data to update with
            data = _objectSpread({}, req.body); // increment helpful by one if true

            if (req.body.helpful === true) {
              data.helpful = current_review.getDataValue('helpful') + 1;
            }

            _context3.next = 11;
            return models.review.update(data, {
              where: {
                id: req.params.id
              }
            });

          case 11:
            _context3.next = 17;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](3);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.json(_context3.t0));

          case 17:
            return _context3.abrupt("return", res.status(200).json({
              "success": true,
              "data": "review with id ".concat(req.params.id, " updated successfully")
            }));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 13]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // get a review

reviewRoute.get('/:id', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var review;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return models.review.findOne({
              where: {
                id: req.params.id
              },
              include: [{
                model: models.reviewAudioVideo,
                as: 'media'
              }]
            });

          case 3:
            review = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              'success': true,
              data: review
            }));

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.json(_context4.t0));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
module.exports = reviewRoute;
//# sourceMappingURL=reviews.js.map