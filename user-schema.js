const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    inventory : [{Item: Object}]
})

module.exports = mongoose.model('users', userSchema);