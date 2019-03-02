const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    publisherId: {
        type: String
    },
    dateReleased: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Game', GameSchema);
