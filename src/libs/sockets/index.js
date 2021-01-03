const { Chats } = require('../../models/Chat.model')

exports.handleSockets = (io) => {
  io.on('connection', (socket) => {
    console.log('Connected to sockets')
  })
}
