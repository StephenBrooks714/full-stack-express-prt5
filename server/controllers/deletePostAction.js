// database
const deletePost = require('../models/BlogPost')

module.exports = async (req, res) => {
    await deletePost.findByIdAndDelete(req.params.id)
    res.redirect('/newPost')
}