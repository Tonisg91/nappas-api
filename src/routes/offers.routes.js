const router = require('express').Router()
const { isAuthenticated, isAuthorized } = require('../middlewares')
const { offerC } = require('../controllers')

// Get single offer
router.get('/:id', isAuthenticated, offerC.getSingleOffer)

// Add offer to announcement
router.post('/:announcement', isAuthenticated, offerC.postAddOffer)

// Edit offer
router.put('/:id', isAuthenticated, isAuthorized, offerC.putEditOffer)

// Delete offer
router.delete('/:offerId', isAuthenticated, isAuthorized, offerC.deleteOffer)

// Accept offer
router.post('/accept/:offerId', isAuthenticated, offerC.postAcceptOffer)

module.exports = router
