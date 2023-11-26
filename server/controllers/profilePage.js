// database
const PostDB = require('../models/Users')

module.exports = async (req, res) => {
    const user = await PostDB.findById(req.params.id).populate('userid')
    res.render("profile", {
        title: "Profile post data for more details about the user.",
        user
    })
}