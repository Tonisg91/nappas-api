const { Chats } = require('../../models/Chat.model')

exports.handleSockets = (io) => {
  console.log(Chats)
  io.on('connection', (socket) => {
    console.log('Connected to sockets')
  })
}
