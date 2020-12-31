const router = require('express').Router()
const { isAuthenticated, isSameUser } = require('../middlewares')
const { usersC } = require('../controllers')

// GET User Info

router.get('/profile', isAuthenticated, isSameUser, usersC.getMyProfile)
router.get('/:userId', isAuthenticated, usersC.getUserInfo)

module.exports = router