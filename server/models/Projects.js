const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProjectPostSchema = new Schema ({
    title: String,
    summary: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: String,
    url: String,
    body: String,
    datePosted:{
        type: Date,
        default: new Date()
    },
})

const ProjectPost = mongoose.model('ProjectPost', ProjectPostSchema);
module.exports = ProjectPost;