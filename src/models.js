const Sequelize = require('sequelize');
const { Model} = require("sequelize");
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;
const saltRounds = 10;
// connect to database
const connection = new Sequelize('db', 'user', 'pass', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'db.sqlite'
})

class User extends Model {
    isPasswordCorrect (password, hashedPassword) {
        // password: sent from client
        // hashedPassword: the stored hashed passwprd
        if (bcrypt.compareSync(password, hashedPassword)) {
            return true
        }
        return false
    }
}
User.init({
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
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
        afterValidate: (user) => {
            user.password = bcrypt.hashSync(user.password, saltRounds)
        }
    }
});

// information about the apartment
const Apartment = connection.define('Apartment', {
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['2 bedroom flat', '3 bedroom flat','a room', 'a room self contain', 'a room and palour self contain','a room and palour']],
        }
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
})

// Review type indicates the type of review
const reviewType = connection.define('reviewType', {
    // target could be -> landlord,environment,apartment,amenities. This should be pre-populated by admin
    target: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['landlord', 'environment', 'apartment', 'amenities']],
        }
    }
})

// review table contains the various comments about apartments, enviroment,landlord etc
const review = connection.define('Review', {
    comment: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    helpful: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})


// review media files contains optional videos and or images for per review
const reviewAudioVideo = connection.define('ReviewAudioVideo', {
    mediaType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['video', 'image']],
        }
    },
    mediaUrl: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Establish relationships among entities
reviewType.hasMany(review) // A review type will have many reviews

User.hasMany(review) // A user will have many reviews

Apartment.hasMany(review, {
    as: 'All_Reviews',
    onDelete: 'CASCADE'
}) // An apartment will have many reviews

review.hasMany(reviewAudioVideo, {
    as: 'media',
    onDelete: 'CASCADE'
}) // A review can have many images and / or videos

// A user may have lived in many apartments before and vice versa
Apartment.belongsToMany(User, {as: 'Tenants', through: 'CustomerApartments'})
User.belongsToMany(Apartment, {as: 'Apartments', through: 'CustomerApartments'})

export {User, Apartment, reviewType, review, reviewAudioVideo, connection};





