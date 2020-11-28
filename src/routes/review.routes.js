const router = require('express').Router()
const { isAuthenticated } = require('../middlewares')
const { Users, Reviews } = require('../models')

router.post('/:professionalId', isAuthenticated, async (req, res) => {
    try {
        const { professionalId } = req.body

        const newReview = await Reviews.create({...req.body})
        await Users.findByIdAndUpdate(professionalId, { $push: { reviews: newReview._id } })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).send('Error sending review.')
    }
})

module.exports = router