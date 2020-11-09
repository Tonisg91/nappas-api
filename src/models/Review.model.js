const { Schema } = require('mongoose')
const withAudit = require('./withAudit.model')

module.exports = withAudit('Announcement',
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        professionalId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        description: String,
        rating: {
            type: Number,
            min: 1,
            max: 5,
        }
    })