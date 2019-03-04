const Log = require('../models/Log');

exports.createLog = function (message, type, email, count) {
    const log = new Log({
        message,
        type,
        email,
        count
    });
    log.save();
};

exports.findLogsByApi = function (type) {
    return Log.find({type}).select('-__v').sort( { count: -1 }) // -1 means descending sort
};

exports.findLogsByPathandEmail = function (message, email) {
    return Log.findOne({message, email}).select('-__v').sort( { count: -1 })
};
