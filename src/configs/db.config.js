const mongoose = require('mongoose')
const config = require('./global.config')

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    // user: config.MONGO_USER,
    // pass: config.MONGO_PASSWORD
}


module.export = (async () => {
    const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`, mongooseOptions)
    console.log('DB is connected to:', db.connection.name)
})()