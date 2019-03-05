const logDb = require('../repositories/LogDb')

exports.createLog = async function createLog(message, email, type) {
    let existingLog = await logDb.findLogsByPathandEmail(message, email);
    if (existingLog) {
        existingLog.count = existingLog.count + 1;
        existingLog.save();
    } else {
        logDb.createLog(message, type, email, 1);
    }
};
