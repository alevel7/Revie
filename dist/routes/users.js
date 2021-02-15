"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var userCtrl = _interopRequireWildcard(require("../controllers/userController.js"));

require("dotenv/config");

var models = _interopRequireWildcard(require("../models"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var usersRoute = require('express').Router();

var jwt = require('jsonwebtoken');

var verifyToken = require('../dependencies.js').verifyToken;

// THE ROUTES
// route to create a user
usersRoute.post('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var newUser, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return userCtrl.addUser(req.body);

          case 3:
            newUser = _context.sent;
            token = jwt.sign({
              id: newUser.getDataValue('id')
            }, process.env.MY_SECRET);
            return _context.abrupt("return", res.status(200).json({
              "status": "success",
              "data": {
                "token": token,
                "userData": newUser
              }
            }));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(422).send(_context.t0));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // route to sign in a user

usersRoute.post('/signin', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, email, password, users, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;

            if (email == '' || password == '') {
              res.status(406).json({
                'success': false,
                'data': 'Username and password is required'
              });
            } // check whether user with such email exist


            _context2.prev = 2;
            _context2.next = 5;
            return userCtrl.getUserByEmail(email);

          case 5:
            users = _context2.sent;

            if (!(users.length == 0)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              'success': false,
              'data': 'invalid email or password'
            }));

          case 8:
            if (!models.User.prototype.isPasswordCorrect(password, users[0].getDataValue('password'))) {
              _context2.next = 11;
              break;
            }

            // generate a login token
            token = jwt.sign({
              id: users[0].getDataValue('id')
            }, process.env.MY_SECRET);
            return _context2.abrupt("return", res.status(400).json({
              'success': true,
              data: {
                token: token,
                userData: users[0]
              }
            }));

          case 11:
            return _context2.abrupt("return", res.status(400).json({
              'success': false,
              'data': 'invalid email or password'
            }));

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            res.status(404).json({
              'success': false,
              errors: _context2.t0
            });

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 14]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // route to get all users

usersRoute.get('/', verifyToken, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var allUsers;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return userCtrl.getAllUsers();

          case 3:
            allUsers = _context3.sent;
            res.status(200).json({
              "success": true,
              "data": allUsers
            });
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            res.status(200).json({
              "success": false,
              errors: _context3.t0
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // route to get a single user

usersRoute.get('/:id', verifyToken, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // get the user with the specified id
            id = req.params.id;

            if (!(Number(id) !== Number(req.userId))) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              'success': false,
              'data': 'Unathorized User'
            }));

          case 3:
            _context4.prev = 3;
            _context4.next = 6;
            return userCtrl.getAUser(id);

          case 6:
            user = _context4.sent;
            res.status(200).json({
              'success': true,
              data: user
            });
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](3);
            res.status(404).json({
              'success': false,
              errors: _context4.t0.errors
            });

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 10]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); // route to  update a user

usersRoute.patch('/:id', verifyToken, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // get the user to be updated
            id = req.params.id;

            if (!(Number(id) !== Number(req.userId))) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              'success': false,
              'data': 'Unathorized User'
            }));

          case 3:
            _context5.prev = 3;
            _context5.next = 6;
            return userCtrl.updateAUser(id, req.body);

          case 6:
            return _context5.abrupt("return", res.status(200).json({
              'success': true,
              data: "User with id ".concat(id, " updated successfully")
            }));

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](3);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(404).json({
              'success': false,
              errors: _context5.t0.errors
            }));

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 9]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = usersRoute;
//# sourceMappingURL=users.js.map