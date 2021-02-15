"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apartmentType = exports.getAllApartment = exports.updateAnApartment = exports.getAnApartment = exports.deleteAnApartment = exports.addAnApartment = void 0;

var model = _interopRequireWildcard(require("../models.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addAnApartment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data, userId) {
    var newApartment;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return model.Apartment.create(data);

          case 2:
            newApartment = _context.sent;
            _context.next = 5;
            return newApartment.addTenants(userId);

          case 5:
            return _context.abrupt("return", newApartment);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addAnApartment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.addAnApartment = addAnApartment;

var deleteAnApartment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return model.Apartment.destroy({
              where: {
                id: id
              }
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function deleteAnApartment(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteAnApartment = deleteAnApartment;

var getAnApartment = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return model.Apartment.findOne({
              where: {
                id: id
              },
              include: [{
                model: model.review,
                as: 'All_Reviews'
              }]
            });

          case 2:
            result = _context3.sent;
            return _context3.abrupt("return", result);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getAnApartment(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAnApartment = getAnApartment;

var updateAnApartment = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, data) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return model.Apartment.update(data, {
              where: {
                id: id
              }
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateAnApartment(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateAnApartment = updateAnApartment;

var getAllApartment = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var allApartment;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return model.Apartment.findAll();

          case 2:
            allApartment = _context5.sent;
            return _context5.abrupt("return", allApartment);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getAllApartment() {
    return _ref5.apply(this, arguments);
  };
}();

exports.getAllApartment = getAllApartment;
var apartmentType = ['2 bedroom flat', '3 bedroom flat', 'a room', 'a room self contain', 'a room and palour self contain', 'a room and palour'];
exports.apartmentType = apartmentType;
//# sourceMappingURL=apartmentController.js.map