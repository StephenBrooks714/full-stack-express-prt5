// database
const ProjectsDb = require('../models/Projects');

module.exports = async (req, res) => {
    const projects = await ProjectsDb.find({}).sort({_id: -1}).populate('userid')
    res.render("projects", {
        title: "Projects page from the express and node app",
        projects
    })
}