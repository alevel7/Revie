require("@babel/polyfill");
import "@babel/polyfill";
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 8001;
const Cors = require('cors')
import multer from 'multer';
import * as model from './models.js';



// middle ware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/images', express.static('images'));


const errHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.json({
            error: "upload failed",
            message: err.message
        })
    }
}
app.use(errHandler);
app.use(Cors())




// add all the routes
const users = require('./routes/users.js')
const apartment = require('./routes/apartments.js')
const reviews = require('./routes/reviews.js')

app.use('/users', users)
app.use('/apartments', apartment)
app.use('/reviews', reviews)

app.get('/', (req, res) => {
    res.send('Welcome to the TeamWork')
  })
  
model.connection.sync({
    logging: console.log,
    // force:true
}).then(() => {
    // prefill the reviewtype table with the reviewtypes
    // list of types that can be reviewed
    const reviewTypeList = ['landlord', 'environment', 'apartment', 'amenities']
    model.reviewType.findAll()
        .then((dbReviewTypeList) => {
            // get a list of all the review type target
            const dbReviewTypeTargetList = dbReviewTypeList.map(type => type.getDataValue('target'))
            // check if any review type is absent in database, add it
            reviewTypeList.forEach((type) => {
                // add each type to the database
                // check if review type not already in database
                if (dbReviewTypeTargetList.includes(type) === false) {
                    // add review type to database
                    model.reviewType.create({
                        target: type
                    }).then((theType) => {
                        console.log(`type ${type} added`)
                    })

                }
            })
        })

})
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database:', error);
    })


app.listen(port, () => {
    console.log(`Running server on port ${port}`);
})