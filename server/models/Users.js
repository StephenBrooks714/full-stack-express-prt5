const mongoose = require('mongoose');
    const bcrypt = require("bcrypt");
    const Schema = mongoose.Schema;
    const uniqueValidator = require('mongoose-unique-validator')

    const UserSchema = new Schema ({
        username: {
            type: String,
            unique: [true,'Please provide username'],
            required: true
        },
        fName: {
            type: String,
            required: true
        },
        lName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: [true,'Please choose a different email'],
            required: true
        },
        password: {
            type: String,
            required: [true,'Please provide password']
        },
        bio: {
            type: String,
            required: [true,'Please describe yourself']
        },
        joinedDate: {
            type: Date,
            default: new Date
        }
    })

    UserSchema.plugin(uniqueValidator)

    UserSchema.pre('save',function(next){
        const user = this
        bcrypt.hash(user.password, 10,(error, hash)=>{
            user.password = hash
            next()
        })
    })

    const User = mongoose.model('User',UserSchema);
    module.exports = User;