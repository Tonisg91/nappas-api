const router = require('express').Router()
const { isAuthenticated, isAuthorized } = require('../middlewares')
const { announcementC } = require('../controllers')

// GET Announcement list
router.get('/', announcementC.getAnnouncementList)

// GET Single announcement
router.get('/:id', announcementC.getSingleAnnouncement)

// POST Add announcement
router.post('/', isAuthenticated, announcementC.postAddAnnouncement)

// PUT Edit announcement
router.put('/:id', isAuthenticated, isAuthorized, announcementC.putEditAnnouncement)

// DELETE Announcement
router.delete('/:id', isAuthenticated, isAuthorized, announcementC.deleteAnnouncement)

module.exports = router