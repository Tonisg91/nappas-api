const jwt = require('jsonwebtoken')
const { Users } = require('../models')
const { JWT_KEY } = require('../configs/global.config')

module.exports = async (req, res, next) => {
    try {
        const tokenEndpoint =
            req.headers.authorization ||
            req.query.access_token ||
            req.body.access_token

        const token = tokenEndpoint.split(' ')[1]

        if (!token) return res.status(403).send('No token provided.')

        const decoded = jwt.verify(token, JWT_KEY)

        const user = await Users.findById(decoded._id)

        if (!user) return res.status(404).json({ message: 'No user found.' })

        req.user = {
            _id: decoded._id,
            role: decoded.role
        }

        next()
    } catch (error) {
        return res.status(401).send('Unauthorized')
    }
}
