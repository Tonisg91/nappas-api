const dbModels = require('../models')
const { getModelNameFromURL } = require('../utils/stringFn')

module.exports = async (req, res, next) => {
    try {
        const { user } = req

        const userFound = await dbModels.Users.findById(user._id)

        if (!userFound.verificated) return res.status(401).send('Unauthorized.')

        if (user.role !== 'user') return next()

        const model = getModelNameFromURL(req.baseUrl)
        const { createdBy } = await dbModels[model].findById(req.params.id)

        const isCreator = createdBy === user._id

        if (!isCreator) return res.status(401).send('Unauthorized')
        next()
    } catch (error) {
        return res.status(401).send('Unauthorized')
    }
}
