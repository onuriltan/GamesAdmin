const mongoose = require('mongoose');

const ConsoleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cpu: {
        type: String
    },
    ram: {
        type: String
    },
    year: {
        type: String
    },
    comment: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Console', ConsoleSchema);
