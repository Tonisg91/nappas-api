const { Chats } = require('./models')

exports.handleSockets = (io) => {
    io.on('connection', (socket) => {
        console.log(`Client ${socket.id} connected`)

        socket.on('getChat', async (body) => {
            try {
                const hasChat = await Chats.findById(body).populate(
                    'createdBy guestUser announcement',
                    'title name photoCard photo'
                )

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

        socket.on('send message', async ({ chatId, msg }) => {
            try {
                await Chats.findByIdAndUpdate(chatId, {
                    $push: { messages: msg }
                })
                io.to(chatId).emit('message', msg)
            } catch (error) {}
        })
        // //TODO: Finalizar sockets

        socket.on('disconnect', (body) => {
            console.log(`Client ${socket.id} diconnected`)
        })
    })
}
