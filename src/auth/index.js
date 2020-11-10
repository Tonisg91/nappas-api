const jwt = require('jsonwebtoken')
const Users = require('../models/Users.model')
const config = require('../configs/global.config')

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return res.sendStatus(403)

    jwt.verify(token, config.JWT_KEY, (err, decoded) => {
        const {_id} = decoded
        Users.findOne({_id}).exec()
            .then(user => {
                req.user = user._id
                next()
            })
    })
}