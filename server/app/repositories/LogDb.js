const Log = require('../models/Log');

exports.createLog = function (path, api, email, count) {
    const log = new Log({
        path,
        api,
        email,
        count
    });
    log.save();
};


exports.findLogsByApi = function (api) {
    return Log.find({api}).select('-__v')
};

exports.findLogsByPathandEmail = function (path, email) {
    return Log.findOne({path, email}).select('-__v')
};
