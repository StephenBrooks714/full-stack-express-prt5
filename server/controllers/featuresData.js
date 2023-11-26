// database
const singleFeatureDB = require('../models/Features')

module.exports = async (req, res) => {
    const feature = await singleFeatureDB.findById(req.params.id).populate('userid')
    res.render("feature", {
        title: "Feature post data for more details about the feature.",
        feature
    })
}