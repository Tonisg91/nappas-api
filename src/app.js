const express = require('express')
const logger = require('morgan')
const config = require('./configs/global.config')
const cors = require('cors')
const { initialSetup } = require('./libs')

const R = require('./routes')


const app = express()

// Seeds
initialSetup()


// Config & middlewares
app.set('port', config.PORT)

app.use(cors({
    credentials: true,
    origin: config.CORS_ORIGIN
}))
app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Routes
app.use('/api', R.auth, R.chats)
app.use('/api/offers', R.offers)
app.use('/api/reviews', R.review)
app.use('/api/users', R.users)
app.use('/api/announcements', R.announcements)


module.exports = app