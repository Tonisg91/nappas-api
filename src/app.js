const express = require('express')
const logger = require('morgan')
const config = require('./configs/global.config')
const cors = require('cors')
const app = express()

const { announcementsRoutes, authRoutes } = require('./routes')


app.set('port', config.PORT)

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/announcements', announcementsRoutes)
app.use('/', authRoutes)

module.exports = app