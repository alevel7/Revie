import * as model from '../models.js'


export const getAllUsers = async () => {
    let result = await model.User.findAll()
    return result
}

export const getAUser = async (id) => {
    const user = await model.User.findAll({  where: { id:id } })
    // returns a list
    return user
}
export const getUserByEmail = async(email) => {
    const user = await model.User.findAll({ where: {email:email} } )
    return user
}

export const updateAUser = async(id, data) => {
    await model.User.update(data, {  where: { id: id } })
}

export const addUser = async(data) => {
    const user = await model.User.create(data)
    return user
}

export const getUserApartments = async(userId) => {
    const result = await model.User.findOne({
        where: {id:userId},
        include:[{
            model: model.Apartment, as: 'Apartments'
        }]
    })
    return result
}

