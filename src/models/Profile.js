const mongoose = require('mongoose');

let schema = mongoose.Schema({
    id: String
});

module.exports = mongoose.model('Profile', schema);