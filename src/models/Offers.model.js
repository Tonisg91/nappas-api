const { Schema, model } = require('mongoose')
const withAudit = require('./withAudit.model')

module.exports = withAudit('Offers',
    {
        professional: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        announcement: {
            type: Schema.Types.ObjectId,
            ref: "Announcement"
        },
        estimatedPrice: Number,
        comments: String,
        accepted: {
            type: Boolean,
            default: false
        },
        finished: {
            type: Boolean,
            default: false,
        }
    })