const logDb = require('../repositories/LogDb')

exports.createLog = async function createLog(req, email, type) {
    let existingLog = await logDb.findLogsByPathandEmail(req.originalUrl, email);
    if(existingLog) {
        existingLog.count = existingLog.count +1;
        existingLog.save();
    }else {
        logDb.createLog(req.originalUrl, type, email, 1);
    }
};
