const { Schema, model } = require('mongoose')

module.exports = model(
  'Chat',
  new Schema(
    {
      messages: [{}],
      announcement: {
        type: Schema.Types.ObjectId,
        ref: 'Announcement'
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      guestUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      announcementFound: {
        type: Schema.Types.ObjectId,
        ref: 'Announcement'
      }
    },
    {
      timestamps: true
    }
  )
)
