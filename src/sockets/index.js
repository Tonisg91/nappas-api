const { Chats } = require('../models')

exports.handleSockets = (io) => {
    io.on('connection', (socket) => {
        console.log('Connected to sockets')
    })
}