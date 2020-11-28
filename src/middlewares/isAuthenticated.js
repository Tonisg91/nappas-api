const jwt = require('jsonwebtoken')
const Users = require('../models/Users.model')
const config = require('../configs/global.config')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) return res.status(403).json({ message: "No token provided." })


        const decoded = await jwt.verify(token, config.JWT_KEY)
        req.userId = decoded._id

        const user = await Users.findById(req.userId, { passwordHash: 0 })

        if (!user) return res.status(404).json({ message: 'No user found.' })

        next()
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
}