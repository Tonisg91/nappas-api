const Users = require('../models/Users.model')

module.exports = async (req, res, next) => {
    try {
        const { user } = req

        const { _id } = await Users.findById(user._id, { passwordHash: 0 })

        if (!_id === user._id) return res.status(404).send('Unauthorized')

        next()
    } catch (error) {
        return res.status(401).send('Unauthorized')
    }
}
