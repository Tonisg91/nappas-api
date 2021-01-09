const { Chats, Users } = require('../models')

const getChat = async (req, res) => {
  try {
    const hasChat = await Chats.findOne(req.body)
    if (hasChat) return res.status(200).json(hasChat)

    const newChat = await Chats.create(req.body)

    const usersToUpdate = [req.body.createdBy, req.body.guestUser]
    await Users.updateMany(
      { _id: { $in: [...usersToUpdate] } },
      { $push: { chats: newChat._id } }
    )
    return res.status(200).json(newChat)
  } catch (error) {
    res.status(500).send('Error finding chat.')
  }
}

const updateChat = async (req, res) => {
  try {
    await Chats.findByIdAndUpdate(req.params.id, req.body)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getChat, updateChat }
