const nodemailer = require('nodemailer')
const config = require('../../configs/global.config')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.GMAIL_ADDRESS,
    pass: config.GMAIL_PASSWORD
  }
})

module.exports = transporter
