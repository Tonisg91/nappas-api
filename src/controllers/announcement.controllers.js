const { Announcements, Users } = require('../models')

const getAnnouncementList = async (req, res) => {
    try {
        const currentAnnounces = await Announcements.find({assigned: false, finished: false}).populate('createdBy', 'photo name')
        if (!currentAnnounces.length) return res.sendStatus(204)

        res.status(200).json(currentAnnounces)
    } catch (error) {
        res.status(500).send('Error getting announcements.')
    }
}

const getSingleAnnouncement = async (req, res) => {
    try {
        const { id } = req.params
        const announcement = await Announcements.findById(id).populate('createdBy', 'photo name')

        if (!announcement) return res.status(404).send("This announcement doesn't exists.")

        res.status(200).json(announcement)
    } catch (error) {
        res.status(500).send('Error getting announcement details')
    }
}

const postAddAnnouncement = async (req, res) => {
    try {
        const newAnnouncement = await Announcements.create({
            ...req.body,
            createdBy: req.userId,
            updatedBy: req.userId
        })

        await Users.findByIdAndUpdate(req.userId, { $push: { announcements: newAnnouncement._id } })

        res.sendStatus(201)
    } catch (error) {
        //TODO: ERROR MIDDLEWARE
        res.status(500).send(error.message ? error.message : 'Error creating announcement.')
    }
}

const putEditAnnouncement = async (req, res) => {
    try {
        const { id } = req.params
        await Announcements.findByIdAndUpdate(id, req.body)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send('Error updating announcement.')
    }
}

const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params
        await Announcements.findByIdAndDelete(id)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send('Error deleting announcement.')
    }
}




module.exports = {
    getAnnouncementList,
    getSingleAnnouncement,
    postAddAnnouncement,
    putEditAnnouncement,
    deleteAnnouncement
}