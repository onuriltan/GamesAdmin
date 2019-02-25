const mongoose = require('mongoose');

const ConsoleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Console', ConsoleSchema);
