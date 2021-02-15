const reviewRoute = require('express').Router();
// import * as reviewCtrl from '../controllers/reviewController.js';
import * as apartmentCtrl from '../controllers/apartmentController.js';

const upload = require('../dependencies.js').upload;
import 'dotenv/config';
const verifyToken = require('../dependencies.js').verifyToken;
import * as models from '../models'



// post a review route
reviewRoute.post('/', upload.single('media'), verifyToken, async (req, res) => {
    const requiredkeys = ["comment", "ApartmentId", "reviewTypeId"]

    // check if all required keys are present
    for (const key of requiredkeys) {
        if (!Object.keys(req.body).includes(key)) {
            return res.status(400).json({
                'success': false,
                "data": `${key} is required but missing`
            })
        }
    }
    // check if any required key has empty value
    if (req.body.comment === "" || req.body.ApartmentId === "" || req.body.reviewTypeId === "") {
        return res.status(400).json({ "success": false, "data": "required fields must not be blank" })
    }
    // check if apartment with the specified id exist
    try {
        const apartment = await apartmentCtrl.getAnApartment(req.body.ApartmentId)
        if (!apartment) {
            return res.status(400).json({ 'success': false, "data": `apartment with id ${req.body.ApartmentId} does not exist` })
        }
    } catch (error) {
        console.log(error)
        return res.json(error)
    }

    try {
        // store the review
        const newReview = await models.review.create({
            ...req.body, UserId: req.userId,
        })
        // store the image or video if any
        if (req.file) {
            let mimetype = 'image';
            if (req.file.mimetype.startsWith('video')) {
                mimetype = 'video'
            }

            await models.reviewAudioVideo.create({
                mediaType: mimetype,
                mediaUrl: req.file.filename,
                ReviewId: newReview.getDataValue('id')
            })
        }

        return res.status(201).json({
            "success": true,
            "data": newReview
        })


    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})

// delete a review route
reviewRoute.delete('/:id', verifyToken, async (req, res) => {
    if (req.params.id === undefined) {
        return res.status(422).json({ "success": false, "data": "No id for review to be deleted specified" })
    }
    await models.review.destroy({
        where: {
            id: req.params.id
        }
    })
    return res.status(200).json({ 'success': true, "data": `review with id ${req.params.id} has been removed` })
})
// patch a review route
reviewRoute.patch('/:id', async (req, res) => {
    if (req.params.id === undefined) {
        return res.status(422).json({ "success": false, "data": "No id for review to be deleted specified" })
    }
    if (req.body.helpful) {
        try {
            // get current review to be updated
            const current_review = await models.review.findOne({ where: { id: req.params.id } })
            // create a new data to update with
            const data = { ...req.body }
            // increment helpful by one if true
            if (req.body.helpful === true) {
                data.helpful = current_review.getDataValue('helpful') + 1
            }
            await models.review.update(data, { where: { id: req.params.id } })
            // store the image or video if any
        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    }
    return res.status(200).json({ "success": true, "data": `review with id ${req.params.id} updated successfully` })

})

// get a review
reviewRoute.get('/:id', async (req, res) => {
    try {
        const review = await models.review.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: models.reviewAudioVideo, as: 'media'
            }]
        })
        return res.status(200).json({'success':true, data:review})
    } catch (error) {
        console.log(error)
        return res.json(error)
    }

})




module.exports = reviewRoute