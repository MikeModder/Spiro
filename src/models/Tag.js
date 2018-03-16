const mongoose = require('mongoose');

let schema = mongoose.Schema({
    name: { type: String, unique: true },
    content: String,
    author: String,
    createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Tag', schema);