const router = require('express').Router()
const isAuthenticated = require('../auth')
const { Offers, Announcements, Users } = require('../models')

// Get single offer
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const offer = await Offers.findById(req.params.id)

        if (!offer) return res.sendStatus(204)

        res.status(200).json({ data: offer})
    } catch (error) {
        res.status(500).send('Error getting offers details.')
    }
})


//Add offer to announcement
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

        res.sendStatus(202)
    } catch (error) {
        res.status(500).send('Error sending offer.')
    }
})

// Edit offer
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const { _id } = req.user
        const { createdBy } = await Offers.findById(req.params.id)
        
        const isCreator = String(createdBy) === String(_id)

        if (!isCreator) return res.sendStatus(401)

        await Offers.findByIdAndUpdate(req.params.id, {...req.body})

        return res.sendStatus(202)
    } catch (error) {
        res.status(500).send('Error updating offer.')
    }
})

// Delete offer
router.delete('/:offerId', isAuthenticated, async (req, res) => {
    try {
        const { _id } = req.user
        const { offerId } = req.params
        const { createdBy, announcement } = await Offers.findById(offerId)

        const isCreator = String(createdBy) === String(_id)

        if (!isCreator) return res.sendStatus(401)

        const deleteOffer = await Offers.findByIdAndDelete(offerId)
        const updatingAnnouncement = await Announcements.findByIdAndUpdate(announcement, { $pullAll: { offers: [offerId]}})

        await Promise.all([deleteOffer, updatingAnnouncement])
        return res.sendStatus(202)
    } catch (error) {
        res.status(500).send('Error deleting offer.')
    }
})

// Accept offer
router.post('/accept/:offerId', isAuthenticated, async (req, res) => {
    try {
        const { _id } = req.user
        const offer = await Offers.findById(req.params.offerId).populate('announcement')

        const isCreator = String(offer.announcement.createdBy) === String(_id)

        if (!isCreator) return res.sendStatus(401)

        const updateOfferToAccepted = await Offers.findByIdAndUpdate(offer._id, { accepted: true})
        const updateAnnouncementToAssigned = await Announcements.findByIdAndUpdate(offer.announcement, { 
            assigned: true, 
            professional_assigned: offer.createdBy,
            offer_accepted: offer._id,
            offers: []
        })
        const updateUser = Users.findByIdAndUpdate(offer.createdBy,{
            $push: {
                workInProgress: offer.announcement
            }
        })

        const updatePromises = [
            updateOfferToAccepted, 
            updateAnnouncementToAssigned, 
            updateUser
        ]

        await Promise.all([updatePromises])
        
        await Offers.deleteMany({announcement: offer.announcement, accepted: false})

        res.sendStatus(202)
    } catch (error) {
        res.status(500).send('Error accepting offer.')
    }
})



module.exports = router