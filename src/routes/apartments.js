const apartmentRoute = require('express').Router();
import 'dotenv/config';
import * as apartmentCtrl from '../controllers/apartmentController.js';
import * as userCtrl from '../controllers/userController.js';
const verifyToken = require('../dependencies.js').verifyToken;


// route to add an apartment
apartmentRoute.post('/',verifyToken, async (req, res) => {
    if (req.body.type === undefined || req.body.address === undefined) {
        return res.status(400).json({ 'success': false, 'data': 'apartment type and address must be specified' })
    }

    if (!req.body.type in apartmentCtrl.apartmentType) {
        return res.status(406).json({
            'success': false,
            data: ` apartment type must be one of 
        ['2 bedroom flat', '3 bedroom flat','a room', 'a room self contain', 'a room and palour self contain','a room and palour']`
        })
    }
    try {
        const newApartment = await apartmentCtrl.addAnApartment(req.body, req.userId)
        // console.log(newApartment)
        const newApartmentId = newApartment.getDataValue('id')
        // stores the new apartmentid and userid in customer apartment table
        return res.status(201).json({
            'success': true,
            'data': newApartment
        })
    } catch (error) {
        console.log(error)
        res.status(422).json({ 'success': false, errors: error })
    }


})

// get all apartments
apartmentRoute.get('/', async (req, res) => {
    try {
        const allApartment = await apartmentCtrl.getAllApartment()
        return res.status(200).json({
            'success': true,
            'data': allApartment
        })
    } catch (error) {
        return res.json({ 'success': false, error: error })
    }

})

// route to update an apartment
apartmentRoute.patch('/:id', verifyToken, async (req, res) => {
    const id = req.params.id

    if (req.body.type !== undefined && !req.body.type in apartmentCtrl.apartmentType) {
        return res.status(406).json({
            'success': false,
            data: ` apartment type must be one of 
        ['2 bedroom flat', '3 bedroom flat','a room', 'a room self contain', 'a room and palour self contain','a room and palour']`
        })
    }

    // get the apartment with such id
    try {
        // get all apartments of the current user
        let all_user_apartments = await userCtrl.getUserApartments(req.userId)
        // extract the list of apartments
        all_user_apartments =  all_user_apartments.getDataValue('Apartments')
        console.log(all_user_apartments);
        // check if the current apartment to be updated belongs to the current user
        const searched_apartment = all_user_apartments.filter(p => p.getDataValue('id') === Number(id))
        console.log(searched_apartment)
        if (searched_apartment.length === 0) {
            return res.status(400).json({'success':false, 'data':'You cannot update an apartment not yours'})
        }else {
            await apartmentCtrl.updateAnApartment(id, req.body)
            return res.status(200).json({'success':true, 'data':` apartment with id ${id} successfully updated`})
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


// get an apartment
apartmentRoute.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const Apartment = await apartmentCtrl.getAnApartment(id)
        return res.status(200).json({
            'success': true,
            'data': Apartment
        })
    } catch (error) {
        console.log(error)
        return res.json({ 'success': false, error: error })
    }

})



module.exports = apartmentRoute