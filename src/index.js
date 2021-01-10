const app = require('./app')
const { handleSockets } = require('./sockets')

require('./configs/db.config')

const server = app.listen(app.get('port'), () => {
    console.log('Listen on port', app.get('port'))
})

const io = require('socket.io')(server, {
    cors: 'http://localhost:3000'
})

handleSockets(io)
