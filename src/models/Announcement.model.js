const { Schema } = require('mongoose')
const withAudit = require('./withAudit.model')

module.exports = withAudit('Announcement', 
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        category: String,
        description: {
            type: String,
        },
        tags: {
            type: [String],
            maxlength: 5,
        },
        photos: {
            type: Array,
            default: ['https://res.cloudinary.com/dkejgwlha/image/upload/v1592555603/friends_amcn0b.png']
        },
        photoCard: {
            type: String,
            default: 'https://res.cloudinary.com/dkejgwlha/image/upload/v1592555603/friends_amcn0b.png'
        },
        assigned: {
            type: Boolean,
            default: false,
        },
        announcer: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        professional: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        offers: [{
            type: Schema.Types.ObjectId,
            ref: 'Offer'
        }],
        offerAccepted: {
            type: Schema.Types.ObjectId,
            ref: 'Offer'
        },
        finished: {
            type: Boolean,
            default: false,
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref: 'Chat'
        },
        location: {
            state: String,
            city: String,
            lat: String,
            lng: String
        }
})