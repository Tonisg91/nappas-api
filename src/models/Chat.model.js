const { Schema, model} = require('mongoose')

module.exports = model('Chat', new Schema({
    messages: [{}],
    announcement: {
        type: Schema.Types.ObjectId,
        ref: 'Announcement'
    },
    createdBy: String,
    guestUser: String,
    announcementFound: {
        type: Schema.Types.ObjectId,
        ref: 'Announcement'
    }
},
    {
        timestamps: true,
    }
))