const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    api: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Log', LogSchema);
