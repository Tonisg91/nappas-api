const router = require('express').Router()
const upload = require('../services/image-upload')
const { isAuthenticated } = require('../middlewares')
const { uploadC } = require('../controllers')

router.post(
    '/upload',
    isAuthenticated,
    upload.array('file', 5),
    uploadC.uploadImages
)

module.exports = router
