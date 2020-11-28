const { Roles } = require('../models')

module.exports = async () => {
    try {
        const count = await Roles.estimatedDocumentCount()

        if (count > 0) return;

        const values = await Promise.all([
            new Roles({ name: 'user' }).save(),
            new Roles({ name: 'admin' }).save(),
            new Roles({ name: 'moderator' }).save()
        ])

        console.log(values)
    } catch (error) {
        console.error(error)
    }
}