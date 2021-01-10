const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3-v2')
const { AWS_CONFIG } = require('../configs/global.config')

AWS.config.update(AWS_CONFIG)
const s3 = new AWS.S3()

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'nappas',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload
