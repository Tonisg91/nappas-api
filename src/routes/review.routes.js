const router = require('express').Router()
const { isAuthenticated } = require('../middlewares')
const { reviewC } = require('../controllers')

router.post('/:professionalId', isAuthenticated, reviewC.postReview)

module.exports = router
