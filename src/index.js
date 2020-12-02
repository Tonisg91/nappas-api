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

    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} diconnected`);
        socket.leave(roomId);
    });
});