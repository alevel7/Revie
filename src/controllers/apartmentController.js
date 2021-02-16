import * as model from '../models.js'


export const addAnApartment = async (data, userId) => {
    const newApartment = await model.Apartment.create(data)
    await newApartment.addTenants(userId)
    return newApartment
}

export const deleteAnApartment = async (id) => {
    await model.Apartment.destroy({
        where: { id: id }
    })
}

export const getAnApartment = async (id, sort) => {
    if (sort === 'mostrecent') {
        const result = await model.Apartment.findOne({
            where: { id: id },
            include: [{
                model: model.review, as: 'All_Reviews'
            }],
            order: [
                [{ model: model.review, as: 'All_Reviews' }, 'createdAt', 'DESC']
            ]
        })
        return result || [];
    } else {
        const result = await model.Apartment.findOne({
            where: { id: id },
            include: [{
                model: model.review, as: 'All_Reviews'
            }],
            order: [
                [{ model: model.review, as: 'All_Reviews' }, 'helpful', 'DESC']
            ]
        })

        return result || []
    }
}


export const updateAnApartment = async (id, data) => {
    await model.Apartment.update(data, { where: { id: id } })
}


export const getAllApartment = async () => {
    const allApartment = await model.Apartment.findAll()
    return allApartment
}

export const apartmentType = [
    '2 bedroom flat',
    '3 bedroom flat',
    'a room',
    'a room self contain',
    'a room and palour self contain',
    'a room and palour'
]