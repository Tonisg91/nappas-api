const express = require('express')
const logger = require('morgan')
const config = require('./configs/global.config')
const cors = require('cors')
const { initialSetup } = require('./libs')

const { announcementsRoutes, authRoutes, offersRoutes, reviewRoutes } = require('./routes')


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
app.use('/api', authRoutes)
app.use('/api/offers', offersRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/announcements', announcementsRoutes)


module.exports = app