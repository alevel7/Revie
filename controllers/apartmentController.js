import * as model from '../models.js'


export const addAnApartment = async (data) => {
    const newApartment = await model.Apartment.create(data)
    return newApartment
}

export const deleteAnApartment = async(id) => {
    await model.Apartment.destroy({
        where:{ id: id}
    })
}

export const getAnApartment = async(id) => {
    const result = await model.Apartment.findOne({
        where: {id: id},
        include: [{
            model: model.review, as: 'All_Reviews'
        }]
    })
    return result;
}


export const updateAnApartment = async(id, data) => {
    await model.Apartment.update(data, {  where: { id: id } })
}


export const getAllApartment = async() => {
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