const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    inventory : [{name: String, description: String, class: Number, weight: Number, value: Number}]
})

module.exports = mongoose.model('users', userSchema);