const { Schema, model} = require('mongoose')

module.exports = model('Chat', new Schema({
    messages: [String],
    announcement: {
        type: Schema.Types.ObjectId,
        ref: 'Announcement'
    }
},
    {
        timestamps: true,
    }
))