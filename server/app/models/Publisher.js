const mongoose = require('mongoose');

const PublisherSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Publisher', GameSchema);
