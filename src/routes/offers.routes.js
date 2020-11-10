const router = require('express').Router()
const isAuthenticated = require('../auth')
const { Offers, Announcements, Users } = require('../models')
const { populate } = require('../models/Users.model')

router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const offer = await Offers.findById(req.params.id)

        res.status(200).json({ data: offer})
    } catch (error) {
        res.status(500).send('Error getting offers details.')
    }
})

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

        const updatedAnnouncement = await Announcements.findByIdAndUpdate(announcement, { $push: { offers: newOffer._id } })

        await Promise.all([newOffer, updatedAnnouncement])

        await Users.findByIdAndUpdate(_id, { $push: { offers: newOffer._id}})

        res.sendStatus(204)
    } catch (error) {
        res.status(500).send('Error sending offer.')
    }
})

module.exports = router