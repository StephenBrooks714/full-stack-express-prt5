// database
const deleteFeaturePost = require('../models/Features')

module.exports = async (req, res) => {
    await deleteFeaturePost.findByIdAndDelete(req.params.id)
    res.redirect('/newFeature')
}