const mongoose = require('mongoose');

const ConsoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
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
