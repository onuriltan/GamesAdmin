const mongoose = require('mongoose');

const PublisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    comment: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Publisher', PublisherSchema);
