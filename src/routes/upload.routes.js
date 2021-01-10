const router = require('express').Router()
const upload = require('../services/image-upload')

router.post('/upload', upload.array('file', 5), async (req, res) => {
  try {
    const locations = req.files.map((f) => f.location)
    res.send(locations)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
