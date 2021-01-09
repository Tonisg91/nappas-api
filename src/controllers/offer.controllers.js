const { Offers, Announcements, Users } = require('../models')

const getSingleOffer = async (req, res) => {
  try {
    const offer = await Offers.findById(req.params.id)

    if (!offer) return res.sendStatus(204)

    res.status(200).json({ data: offer })
  } catch (error) {
    res.status(500).send('Error getting offers details.')
  }
}

const postAddOffer = async (req, res) => {
  try {
    const { announcement } = req.params
    const { estimatedPrice, comments } = req.body

    if ((!estimatedPrice, !comments))
      return res.status(400).send('Price & comments are mandatory.')

    const newOffer = await Offers.create({
      createdBy: req.userId,
      updatedBy: req.userId,
      announcement,
      estimatedPrice,
      comments
    })

    const updatedAnnouncement = await Announcements.findByIdAndUpdate(
      announcement,
      { $push: { offers: newOffer._id } }
    )

    await Promise.all([newOffer, updatedAnnouncement])

    await Users.findByIdAndUpdate(req.userId, {
      $push: { offers: newOffer._id }
    })

    res.sendStatus(202)
  } catch (error) {
    res.status(500).send('Error sending offer.')
  }
}

const putEditOffer = async (req, res) => {
  try {
    await Offers.findByIdAndUpdate(req.params.id, { ...req.body })

    return res.sendStatus(202)
  } catch (error) {
    res.status(500).send('Error updating offer.')
  }
}

const deleteOffer = async (req, res) => {
  try {
    const { offerId } = req.params
    const { announcement } = await Offers.findById(offerId)

    const deleteOffer = await Offers.findByIdAndDelete(offerId)
    const updatingAnnouncement = await Announcements.findByIdAndUpdate(
      announcement,
      { $pullAll: { offers: [offerId] } }
    )

    await Promise.all([deleteOffer, updatingAnnouncement])
    return res.sendStatus(202)
  } catch (error) {
    res.status(500).send('Error deleting offer.')
  }
}

const postAcceptOffer = async (req, res) => {
  try {
    const offer = await Offers.findById(req.params.offerId).populate(
      'announcement'
    )

    const isCreator = offer.announcement.createdBy === req.userId

    if (!isCreator) return res.sendStatus(401)

    const updateOfferToAccepted = await Offers.findByIdAndUpdate(offer._id, {
      accepted: true
    })
    const updateAnnouncementToAssigned = await Announcements.findByIdAndUpdate(
      offer.announcement,
      {
        assigned: true,
        professional_assigned: offer.createdBy,
        offer_accepted: offer._id,
        offers: []
      }
    )
    const updateUser = Users.findByIdAndUpdate(offer.createdBy, {
      $push: {
        workInProgress: offer.announcement
      }
    })

    const updatePromises = [
      updateOfferToAccepted,
      updateAnnouncementToAssigned,
      updateUser
    ]

    await Promise.all([updatePromises])

    await Offers.deleteMany({
      announcement: offer.announcement,
      accepted: false
    })

    res.sendStatus(202)
  } catch (error) {
    res.status(500).send('Error accepting offer.')
  }
}

module.exports = {
  getSingleOffer,
  postAddOffer,
  putEditOffer,
  deleteOffer,
  postAcceptOffer
}
