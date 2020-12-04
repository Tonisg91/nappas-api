const app = require('./app')

require('./configs/db.config')

const server = app.listen(app.get('port'), () => {
    console.log('Listen on port' , app.get('port'))
})

const io = require('socket.io')(server, {
    cors: 'http://localhost:3000'
})

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'


io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);
    //TODO: Finalizar sockets

    const { roomId } = socket.handshake.query

    //    Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
        // console.log(socket)
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} diconnected`);
        socket.leave(roomId);
    });
});