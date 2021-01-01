const app = require('./app')

require('./configs/db.config')

const server = app.listen(app.get('port'), () => {
    console.log('Listen on port' , app.get('port'))
})

const io = require('socket.io')(server, {
    cors: 'http://localhost:3000'
})


io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);
    socket.emit('your id', socket.id)

    socket.on('send message', (body) => {
        io.emit("message", body)
    })
    // //TODO: Finalizar sockets

    // const { roomId } = socket.handshake.query

    // //    Listen for new messages
    // socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    //     console.log(data)
    //     io.to(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    // });

    // // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} diconnected`);
    });
});