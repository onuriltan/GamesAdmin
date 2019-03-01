const Log = require('../models/Log');

exports.createLog = function (path, type, email, count) {
    const log = new Log({
        path,
        type,
        email,
        count
    });
    log.save();
};

exports.findLogsByApi = function (type) {
    return Log.find({type}).select('-__v')
};

exports.findLogsByPathandEmail = function (path, email) {
    return Log.findOne({path, email}).select('-__v')
};
