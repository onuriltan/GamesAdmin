const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    count: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Log', LogSchema);
