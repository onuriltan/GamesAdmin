const Log = require('../models/Log');

exports.createLog = function (title, api, email) {
    const log = new Log({
        title,
        api,
        email
    });
    log.save();
};


exports.findLogsByApi = function (api) {
    return Log.find({api})
};
