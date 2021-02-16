const usersRoute = require('express').Router();
const jwt = require('jsonwebtoken');
import * as userCtrl from '../controllers/userController.js';
import 'dotenv/config';
const verifyToken = require('../dependencies.js').verifyToken;
import * as models from '../models'

// THE ROUTES

// route to create a user
usersRoute.post('/', async (req, res) => {
    // extract the user data an validate
    try {
        const newUser = await userCtrl.addUser(req.body)
        // remove password field
        delete newUser.dataValues.password
        const token = jwt.sign({ id:newUser.getDataValue('id') }, process.env.MY_SECRET);
        return res.status(200).json({
            "status": "success",
            "data": {
              "token": token,
              "userData": newUser
            }})
    } catch (error) {
        console.log(error)
        return res.status(422).send(error)
    }
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
        const users = await userCtrl.getUserByEmail(email)
        // check if any user exists or not
        if (users.length == 0) {
            return res.status(400).json({'success':false, 'data':'invalid email or password'})
        }
        // check if the user password is correct
        if (models.User.prototype.isPasswordCorrect(password, users[0].getDataValue('password'))) {
            // generate a login token
            const token = jwt.sign({ id:users[0].getDataValue('id') }, process.env.MY_SECRET);
            delete users[0].dataValues.password
            return res.status(400).json({'success':true, data: {
                token: token,
                userData: users[0]
            }})
        }
        return res.status(400).json({'success':false, 'data':'invalid email or password'})
    } catch (error) {
        console.log(error)
        res.status(404).json({'success':false, errors:error})
    }
})
// route to get all users
usersRoute.get('/', verifyToken, async (req, res) => {
    // extract all users
    try {
        // const allUsers = await model.User.findAll()
        const allUsers = await userCtrl.getAllUsers()
        res.status(200).json({"success": true, "data": allUsers})
    } catch (error) {
        res.status(200).json({"success": false, errors: error})
    }
})

// route to get a single user
usersRoute.get('/:id',verifyToken, async (req, res) => {
    // get the user with the specified id
    const id = req.params.id
    if (Number(id) !== Number(req.userId)){
        return res.status(400).json({'success':false, 'data':'Unathorized User'})
    }
    try {
        const user = await userCtrl.getAUser(id)
        res.status(200).json({'success':true, data:user})
    } catch (error) {
        res.status(404).json({'success':false, errors:error.errors})
    }

})

// route to  update a user
usersRoute.patch('/:id',verifyToken, async (req, res) => {
    // get the user to be updated
    const id = req.params.id
    if (Number(id) !== Number(req.userId)){
        return res.status(400).json({'success':false, 'data':'Unathorized User'})
    }
    try {
        await userCtrl.updateAUser(id, req.body)
        return res.status(200).json({'success':true, data:`User with id ${id} updated successfully`})
    } catch (error){
        console.log(error)
        return res.status(404).json({'success':false, errors:error.errors})
    } 
})



module.exports = usersRoute