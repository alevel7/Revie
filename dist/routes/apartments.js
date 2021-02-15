"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("dotenv/config");

var apartmentCtrl = _interopRequireWildcard(require("../controllers/apartmentController.js"));

var userCtrl = _interopRequireWildcard(require("../controllers/userController.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var apartmentRoute = require('express').Router();

var verifyToken = require('../dependencies.js').verifyToken; // route to add an apartment


apartmentRoute.post('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var newApartment, newApartmentId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.body.type === undefined || req.body.address === undefined)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              'success': false,
              'data': 'apartment type and address must be specified'
            }));

          case 2:
            if (!(!req.body.type in apartmentCtrl.apartmentType)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(406).json({
              'success': false,
              data: " apartment type must be one of \n        ['2 bedroom flat', '3 bedroom flat','a room', 'a room self contain', 'a room and palour self contain','a room and palour']"
            }));

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return apartmentCtrl.addAnApartment(req.body, req.userId);

          case 7:
            newApartment = _context.sent;
            // console.log(newApartment)
            newApartmentId = newApartment.getDataValue('id'); // stores the new apartmentid and userid in customer apartment table

            return _context.abrupt("return", res.status(201).json({
              'success': true,
              'data': newApartment
            }));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);
            res.status(422).json({
              'success': false,
              errors: _context.t0
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // get all apartments

apartmentRoute.get('/', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var allApartment;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return apartmentCtrl.getAllApartment();

          case 3:
            allApartment = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              'success': true,
              'data': allApartment
            }));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.json({
              'success': false,
              error: _context2.t0
            }));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // route to update an apartment

apartmentRoute.patch('/:id', verifyToken, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, all_user_apartments, searched_apartment;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;

            if (!(req.body.type !== undefined && !req.body.type in apartmentCtrl.apartmentType)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(406).json({
              'success': false,
              data: " apartment type must be one of \n        ['2 bedroom flat', '3 bedroom flat','a room', 'a room self contain', 'a room and palour self contain','a room and palour']"
            }));

          case 3:
            _context3.prev = 3;
            _context3.next = 6;
            return userCtrl.getUserApartments(req.userId);

          case 6:
            all_user_apartments = _context3.sent;
            // extract the list of apartments
            all_user_apartments = all_user_apartments.getDataValue('Apartments'); // console.log(all_user_apartments);
            // check if the current apartment to be updated belongs to the current user

            searched_apartment = all_user_apartments.filter(function (p) {
              return p.getDataValue('id') === Number(id);
            });

            if (!(searched_apartment.length === 0)) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              'success': false,
              'data': 'You cannot update an apartment not yours'
            }));

          case 13:
            _context3.next = 15;
            return apartmentCtrl.updateAnApartment(id, req.body);

          case 15:
            return _context3.abrupt("return", res.status(200).json({
              'success': true,
              'data': " apartment with id ".concat(id, " successfully updated")
            }));

          case 16:
            _context3.next = 22;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](3);
            console.log(_context3.t0);
            res.send(_context3.t0);

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 18]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // get an apartment

apartmentRoute.get('/:id', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, Apartment;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return apartmentCtrl.getAnApartment(id);

          case 4:
            Apartment = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              'success': true,
              'data': Apartment
            }));

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.json({
              'success': false,
              error: _context4.t0
            }));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
module.exports = apartmentRoute;
//# sourceMappingURL=apartments.js.map