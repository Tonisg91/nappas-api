const config = require('./global.config')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_KEY,
  api_secret: config.CLOUD_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Nappas',
    format: async (req, file) => 'png',
    public_id: (req, file) => file.originalname,
  },
})

module.exports = multer({ storage })
