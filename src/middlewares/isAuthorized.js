const { Users, Roles } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const user = await Users.findById(req.userId)
        const role = await Roles.findById(user.role)

        switch (role.name) {
            case 'admin':
                next()
            case 'moderator':
                next()
            default:
                return;
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}