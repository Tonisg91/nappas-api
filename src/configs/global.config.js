require('dotenv').config()

module.exports = {
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'nappas',
    MONGO_USER: process.env.MONGO_USER || 'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin',
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    PORT: Number(process.env.PORT) || 5000,
    JWT_KEY: process.env.JWT_KEY || 'dev',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_KEY: process.env.CLOUD_KEY,
    CLOUD_SECRET: process.env.CLOUD_SECRET
}