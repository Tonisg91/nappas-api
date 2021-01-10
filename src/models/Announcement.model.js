const { Schema } = require('mongoose')
const withAudit = require('./withAudit.model')

module.exports = withAudit('Announcement', {
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: [
            'construccion',
            'jardineria',
            'informatica',
            'mecanica',
            'pintura',
            'otros'
        ],
        default: 'otros'
    },
    budget: Number,
    description: {
        type: String
    },
    tags: {
        type: [String],
        maxlength: 5
    },
    photos: {
        type: Array,
        default: [
            'https://res.cloudinary.com/dkejgwlha/image/upload/v1592555603/friends_amcn0b.png'
        ]
    },
    photoCard: {
        type: String,
        default:
            'https://res.cloudinary.com/dkejgwlha/image/upload/v1592555603/friends_amcn0b.png'
    },
    assigned: {
        type: Boolean,
        default: false
    },
    professional_assigned: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    offers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Offer'
        }
    ],
    offer_accepted: {
        type: Schema.Types.ObjectId,
        ref: 'Offer'
    },
    finished: {
        type: Boolean,
        default: false
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    },
    location: {
        state: String,
        city: String,
        lat: {
            type: Number,
            match: ['[-+]?[0-9]*(.[0-9]+)?', 'Match error at lat.']
        },
        lng: {
            type: Number,
            match: ['[-+]?[0-9]*(.[0-9]+)?', 'Match error at lng.']
        }
    }
})
