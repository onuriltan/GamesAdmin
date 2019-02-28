const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    path: {
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
    count: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Log', LogSchema);
