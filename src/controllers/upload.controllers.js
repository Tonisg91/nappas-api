const uploadImages = async (req, res) => {
    try {
        const locations = req.files.map((f) => f.location)
        res.status(200).send(locations)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    uploadImages
}
