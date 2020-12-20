const { response } = require('express')
const { Users } = require('../models')

const getUserInfo = async (req, res) => {
    try {
        const userFound = await Users.findById(req.params.userId).populate('announcements', 'title photoCard').populate('reviews')

        if (!userFound) return res.status(404).send("This user doesn't exists")

        const { photo, announcements, reviews, _id, name } = userFound

        
        const responseBody = {
            photo,
            announcements,
            reviews,
            _id,
            name
        }
        res.status(200).json(responseBody)
    } catch (error) {
        res.status(500).send('Error getting user details.')
    }
}

module.exports = {
    getUserInfo
}