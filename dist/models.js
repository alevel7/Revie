"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connection = exports.reviewAudioVideo = exports.review = exports.reviewType = exports.Apartment = exports.User = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Sequelize = require('sequelize');

var _require = require("sequelize"),
    Model = _require.Model;

var bcrypt = require('bcrypt');

var Op = Sequelize.Op;
var saltRounds = 10; // connect to database

var connection = new Sequelize('db', 'user', 'pass', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'db.sqlite'
});
exports.connection = connection;

var User = /*#__PURE__*/function (_Model) {
  _inherits(User, _Model);

  var _super = _createSuper(User);

  function User() {
    _classCallCheck(this, User);

    return _super.apply(this, arguments);
  }

  _createClass(User, [{
    key: "isPasswordCorrect",
    value: function isPasswordCorrect(password, hashedPassword) {
      // password: sent from client
      // hashedPassword: the stored hashed passwprd
      if (bcrypt.compareSync(password, hashedPassword)) {
        return true;
      }

      return false;
    }
  }]);

  return User;
}(Model);

exports.User = User;
User.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING(64),
    is: /^[0-9a-f]{64}$/i
  }
}, {
  sequelize: connection,
  hooks: {
    afterValidate: function afterValidate(user) {
      user.password = bcrypt.hashSync(user.password, saltRounds);
    }
  }
}); // information about the apartment

var Apartment = connection.define('Apartment', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['2 bedroom flat', '3 bedroom flat', 'a room', 'a room self contain', 'a room and palour self contain', 'a room and palour']]
    }
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}); // Review type indicates the type of review

exports.Apartment = Apartment;
var reviewType = connection.define('reviewType', {
  // target could be -> landlord,environment,apartment,amenities. This should be pre-populated by admin
  target: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['landlord', 'environment', 'apartment', 'amenities']]
    }
  }
}); // review table contains the various comments about apartments, enviroment,landlord etc

exports.reviewType = reviewType;
var review = connection.define('Review', {
  comment: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  helpful: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}); // review media files contains optional videos and or images for per review

exports.review = review;
var reviewAudioVideo = connection.define('ReviewAudioVideo', {
  mediaType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['video', 'image']]
    }
  },
  mediaUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
}); // Establish relationships among entities

exports.reviewAudioVideo = reviewAudioVideo;
reviewType.hasMany(review); // A review type will have many reviews

User.hasMany(review); // A user will have many reviews

Apartment.hasMany(review, {
  as: 'All_Reviews',
  onDelete: 'CASCADE'
}); // An apartment will have many reviews

review.hasMany(reviewAudioVideo, {
  as: 'media',
  onDelete: 'CASCADE'
}); // A review can have many images and / or videos
// A user may have lived in many apartments before and vice versa

Apartment.belongsToMany(User, {
  as: 'Tenants',
  through: 'CustomerApartments'
});
User.belongsToMany(Apartment, {
  as: 'Apartments',
  through: 'CustomerApartments'
});
//# sourceMappingURL=models.js.map