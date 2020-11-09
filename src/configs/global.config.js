require('dotenv').config()

module.exports = {
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'nappas',
    MONGO_USER: process.env.MONGO_USER || 'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin',
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    PORT: Number(process.env.PORT) || 5000,
    JWT_KEY: process.env.JWT_KEY || 'dev'
}