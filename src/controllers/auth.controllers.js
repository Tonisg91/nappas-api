const jwt = require('jsonwebtoken')
const { nodemailer } = require('../libs')
const config = require('../configs/global.config')
const fs = require('fs')

const { Users, Roles } = require('../models')
const confirmationTemplate = require('../templates/confirmationEmail')

const signToken = (_id) => {
    return jwt.sign(
        { _id },
        String(config.JWT_KEY),
        { expiresIn: 60 * 60 * 24 * 365 }
    )
}

const postSignup = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password) return res.status(400).send('Email and password are mandatory.')

        const userFound = await Users.findOne({ email })
        if (userFound) return res.status(200).send('User already exists.')

        const foundRole = await Roles.findOne({ name: role ? role : 'user' })

        const newUser = await Users.create({
            email,
            passwordHash: await Users.encryptPassword(password),
            role: foundRole._id
        })

        await nodemailer.sendMail({
            from: 'Ñappas',
            to: email,
            subject: 'Email confirmation Ñappas',
            html: confirmationTemplate(newUser._id)
        })

        res.status(200).send('User created succesfully.')
    } catch (error) {
        res.status(500).send('Signup error.')
    }
}

const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).send('Email and password are mandatory.')

        const userFound = await Users.findOne({ email }).populate('role')

        if (!userFound) return res.status(204).send("User doesn't exists. Please, create an account.")

        const pwdMatch = await Users.comparePassword(password, userFound.passwordHash)

        if (!pwdMatch) return res.status(401).send("Password doesn't match.")

        const token = signToken(userFound._id)
        res.status(200).send(token)
    } catch (error) {
        res.status(500).send('Login error.')
    }
}

const postVerify = async (req, res) => {
    try {
        const { userId } = req.params
        await Users.findByIdAndUpdate(userId, {
            verificated: true
        })

        res.status(200).send("Verify has been successful.")
    } catch (error) {
        res.status(500).send('Verification error')
    }
}

module.exports = {
    postSignup,
    postLogin,
    postVerify
}