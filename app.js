const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 8001;

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

// add all the routes
const users = require('./routes/users.js')
const apartment = require('./routes/apartments.js')
const reviews = require('./routes/reviews.js')
const reviewtype = require('./routes/reviewtype')

app.use('/users', users)
app.use('/apartments', apartment)
// app.use('/reviews', reviews)
// app.use('/reviewtype', reviewtype)


model.connection.sync({
    logging: console.log,
    // force:true
}).then(() => {
    // prefill the reviewtype table with the reviewtypes
    // list of types that can be reviewed
    const reviewTypeList = ['landlord', 'environment', 'apartment', 'amenities']
    model.reviewType.findAll()
        .then((dbReviewTypeList) => {
            console.log(dbReviewTypeList)
            const dbReviewTypeTargetList = dbReviewTypeList.map(type => type.getValueData('target'))
            console.log(dbReviewTypeTargetList)

            reviewTypeList.forEach((type) => {
                console.log(`selecting type ${type}`)
                // add each type to the database
                // check if review type not already in database
                const status = type in dbReviewTypeTargetList
                console.log(`${type} in db ${status}`)
                if (!status) {
                    console.log(`adding type ${type}`)
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