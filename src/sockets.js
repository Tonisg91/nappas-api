const { Chats } = require('./models')

exports.handleSockets = (io) => {
  io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected`)

    socket.on('getChat', async (body) => {
      console.log('GETCHAT')
      try {
        const hasChat = await Chats.findById(body)

        if (hasChat) return io.emit('getChat', hasChat)

        const newChat = await Chats.create(body)
        io.emit('getChat', newChat)
      } catch (error) {
        io.emit('error', 'Error getting chat data')
      }
    })

    socket.on('join', (chatId) => {
      socket.join(chatId)
    })

    socket.on('send message', async (body) => {
      await Chats.findByIdAndUpdate(body.chatId, {
        $push: { messages: body.msg },
      })
      io.to(body.chatId).emit('message', body.msg)
    })
    // //TODO: Finalizar sockets

    socket.on('disconnect', () => {
      console.log(`Client ${socket.id} diconnected`)
    })
  })
}
