"use strict";

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// middlewares
var jwt = require('jsonwebtoken'); // import 'dotenv/config';


var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.headers.token) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              "success": false,
              "error": "Unauthorized user"
            }));

          case 2:
            token = req.headers.token;

            if (!(token === 'null')) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              "status": "token error",
              "error": "Token is required"
            }));

          case 5:
            jwt.verify(token, process.env.MY_SECRET, function (err, decoded) {
              if (err) {
                return res.status(401).json({
                  "status": "token error",
                  "error": "Unauthorized request"
                });
              }

              req.userId = decoded.id;
              console.log(req.userId);
            });
            next();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); //to store images in a folder in node js


var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'images');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "_").concat(file.originalname));
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'video/mpeg' || file.mimetype == 'video/3gpp' || file.mimetype == 'video/x-msvideo') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: fileFilter
});
module.exports = {
  verifyToken: verifyToken,
  upload: upload
};
//# sourceMappingURL=dependencies.js.map