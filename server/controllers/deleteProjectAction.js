// database
const deleteProjects = require('../models/Projects')

module.exports = async (req, res) => {
    await deleteProjects.findByIdAndDelete(req.params.id)
    res.redirect('/newProject')
}