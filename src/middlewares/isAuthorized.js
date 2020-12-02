const dbModels = require('../models')
const { getModelNameFromURL } = require('../utils/stringFn')

module.exports = async (req, res, next) => {
    try {

        const { Users, Roles } = dbModels

        const user = await Users.findById(req.userId)
        const role = await Roles.findById(user.role)

        switch (role.name) {
            case 'admin' || 'moderator':
                return next()
            default:
                const model = getModelNameFromURL(req.baseUrl)
                const { createdBy } = await dbModels[model].findById(req.params.id)

                const isCreator = createdBy == req.userId

                if (!isCreator) return res.status(401).json({message: "Unauthorized"})
                return next()
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

