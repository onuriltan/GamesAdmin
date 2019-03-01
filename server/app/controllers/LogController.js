const logDb = require('../repositories/LogDb')
const jwtHelper = require('../helpers/JwtHelper');

exports.getLogsByType = async function (req, res, next) {
    let type = req.params.type;
    let logs = await logDb.findLogsByApi(type);
    res.json(logs);
};

