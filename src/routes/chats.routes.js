const router = require('express').Router()
const { chatsC } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.post('/chat', isAuthenticated, chatsC.getChat)

module.exports = router
