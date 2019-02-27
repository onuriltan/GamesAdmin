const Log = require('../models/Log');

exports.createLog = async function (title, api, email) {
    const log = new Log({
        title,
        api,
        email
    });
    await log.save();
    return log;
};
