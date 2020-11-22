const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../configs/global.config')

const Users = require('../models/Users.model')

const signToken = (_id) => {
    return jwt.sign(
        {_id},
        String(config.JWT_KEY),
        {expiresIn: 60 * 60 * 24 * 365}
    )
}
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).send('Email and password are mandatory.')

        const existentUser = await Users.findOne({email})
        if (existentUser) return res.status(200).send('User already exists.')

        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)
        await Users.create({email, passwordHash})

        res.status(200).send('User created succesfully.')
    } catch (error) {
        res.status(500).send('Signup error.')
    }
})

router.post('/login', async (req, res) => {
    try {
        
        const { email, password } = req.body
        if (!email || !password) return res.status(400).send('Email and password are mandatory.')

        
        const existentUser = await Users.findOne({ email })
        if (!existentUser) return res.status(204).send("User doesn't exists. Please, create an account.")

        const pwdMatch = bcrypt.compareSync(password, existentUser.passwordHash)
        
        if (!pwdMatch) return res.status(401).send("Password doesn't match.")

        const token = signToken(existentUser._id)
        res.status(200).send(token)
    } catch (error) {
        res.status(500).send('Login error.')
    }
})

module.exports = router