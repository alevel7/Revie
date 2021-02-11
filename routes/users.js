const usersRoute = require('express').Router();
const jwt = require('jsonwebtoken');
import 'dotenv/config';


import * as model from '../models.js'
// THE ROUTES

// route to create a user
usersRoute.post('/', (req, res) => {
    // extract the user data an validate
    model.User.create(req.body)
    .then(user => {
        // generate a token with the user id
        const token = jwt.sign({ id:user.id }, process.env.MY_SECRET);
        // return response
        res.status(200).json({
            "status": "success",
            "data": {
              "token": token,
              "userData": user
            }})
    }).catch(error => {
        console.log(error);
        res.status(422).send(error)
    })
})

// route to sign in a user
usersRoute.post('/signin', async (req, res) => {
    const {email, password} = req.body
    if (email == '' || password == ''){
        res.status(406).json({'success':false, 'data':'Username and password is required'})
    }
    // check whether user with such email exist
    try {
        // fetch all users with such email
        const users = await model.User.findAll({  where: {  email: email } })
        // check if any user exists or not
        if (users.length == 0) {
            return res.status(400).json({'success':false, 'data':'invalid email or password'})
        }
        // check if the user password is correct
        if (model.User.prototype.isPasswordCorrect(password, users[0].getDataValue('password'))) {
            // generate a login token
            const token = jwt.sign({ id:users[0].getDataValue('id') }, process.env.MY_SECRET);

            return res.status(400).json({'success':true, data: {
                token: token,
                userData: users[0]
            }})
        }
        return res.status(400).json({'success':false, 'data':'invalid email or password'})
    } catch (error) {
        res.status(404).json({'success':false, errors:error})
    }
})
// route to get all users
usersRoute.get('/', async (req, res) => {
    // extract all users
    try {
        const allUsers = await model.User.findAll()
        res.status(200).json({"success": true, "data": allUsers})
    } catch (error) {
        res.status(200).json({"success": false, errors: error})
    }
})

// route to get a single user
usersRoute.get('/:id', async (req, res) => {
    // get the user with the specified id
    const id = req.params.id
    try {
        const user = await model.User.findAll({  where: { id:id } })
        res.status(200).json({'success':true, data:user})
    } catch (error) {
        res.status(404).json({'success':false, errors:error.errors})
    }

})

// route to  update a user
usersRoute.patch('/:id', async (req, res) => {
    // get the user to be updated
    const id = req.params.id
    console.log(`User with id ${id} requested`)
    try {
        await model.User.update(req.body, {  where: { id: id } })
        res.status(200).json({'success':true, data:`User with id ${id} updated successfully`})
    } catch (error){
        res.status(404).json({'success':false, errors:error.errors})
    } 
})



module.exports = usersRoute