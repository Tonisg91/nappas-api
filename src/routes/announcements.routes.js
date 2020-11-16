const router = require('express').Router()
const isAuthenticated = require('../auth')
const { Announcements, Users } = require('../models')
const fileUploader = require('../configs/cloudinary.config')

router.get('/', async (req, res) => {
    try {
        const currentAnnounces = await Announcements.find({})
        if (!currentAnnounces.length) return res.sendStatus(204)

        res.status(200).json({ data: currentAnnounces })
    } catch (error) {
        res.status(500).send('Error getting meals.')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const announcement = await Announcements.findById(id)

        if (!announcement) res.status(404).send("This announcement doesn't exists.")

        res.status(200).json({ data: announcement })
    } catch (error) {
        res.status(500).send('Error getting announcement details')
    }
})

router.post('/', isAuthenticated, fileUploader.array('photos') , async (req, res) => {
    try {
        const { _id } = req.user

        const photos = req.files.length ? Array.from(req.files).map(f => f.path) : undefined
        const photoCard = req.files.length ? photos[0] : undefined

        const newAnnouncement = await Announcements.create({
            ...req.body,
            photos,
            photoCard,
            createdBy: _id,
            updatedBy: _id
        })

        await Users.findByIdAndUpdate(_id, { $push: { announcements: newAnnouncement._id}})

        res.sendStatus(201)
    } catch (error) {
        res.status(500).send('Error creating announcement.')
    }
})

router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params
        await Announcements.findByIdAndUpdate(id, req.body)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send('Error updating announcement.')
    }
})

router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params
        await Announcements.findByIdAndDelete(id)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send('Error deleting announcement.')
    }
})

module.exports = router