const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    age: Number,
    password: String,
})

const users = mongoose.model('User_Auth', userSchema);

module.exports = users;