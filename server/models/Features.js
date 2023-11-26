const mongoose = require("mongoose");
const Schema = mongoose.Schema

const PricingPostSchema = new Schema ({
    title: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: String,
    url: String,
    feature: Array,
    datePosted:{
        type: Date,
        default: new Date()
    },
})

const PricingPost = mongoose.model('PricingPost', PricingPostSchema);
module.exports = PricingPost;