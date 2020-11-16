const express = require('express')
const logger = require('morgan')
const config = require('./configs/global.config')
const cors = require('cors')
const app = express()

const { announcementsRoutes, authRoutes, offersRoutes, reviewRoutes } = require('./routes')

app.set('port', config.PORT)

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api', authRoutes)
app.use('/api/offers', offersRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/announcements', announcementsRoutes)

module.exports = app