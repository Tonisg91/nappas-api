const router = require('express').Router()
const { isAuthenticated } = require('../middlewares')
const { usersC } = require('../controllers')

// GET User Info

router.get('/:userId', isAuthenticated, usersC.getUserInfo)

module.exports = router