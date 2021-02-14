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
    force:true
})
.then(() => {
     console.log('Connection has been established successfully.');
}).catch ((error) => {
    console.error('Unable to connect to the database:', error);
})


app.listen(port, () => {
    console.log(`Running server on port ${port}`);
})