// database
const ProjectDB = require('../models/Projects')

module.exports = async (req, res) => {
    const project = await ProjectDB.findById(req.params.id).populate('userid')
    res.render("project", {
        title: "Project post data for more details about the project.",
        project
    })
}