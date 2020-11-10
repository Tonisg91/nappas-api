const router = require('express').Router()
const isAuthenticated = require('../auth')

const Offers = require('../models/Offers.model')
const Announcements = require('../models/Announcement.model')

router.post('/:announcement', isAuthenticated, async (req, res) => {
    try {
        const { _id } = req.user
        const { announcement } = req.params
        const { estimatedPrice, comments } = req.body

        if (!estimatedPrice, !comments) return res.status(400).send('Price & comments are mandatory.')

        const newOffer = await Offers.create({
            createdBy: _id,
            updatedBy: _id,
            announcement,
            estimatedPrice,
            comments
        })


        await Announcements.findByIdAndUpdate(announcement, { $push: { offers: newOffer._id } })

        res.send(204)
    } catch (error) {
        res.status(500).send('Error sending offer.')
    }
})

module.exports = router