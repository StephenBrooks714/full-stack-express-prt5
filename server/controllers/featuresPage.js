// database
const BlogsDb = require('../models/Features');

module.exports = async (req, res) => {
    const features = await BlogsDb.find({}).sort({_id: -1}).populate('userid')
    res.render("features", {
        title: "Features page from express and node app.",
        features
    })
}