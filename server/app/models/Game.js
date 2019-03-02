const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateReleased: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Game', GameSchema);
