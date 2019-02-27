const logDb = require('../repositories/LogDb')
const jwtHelper = require('../helpers/JwtHelper');

exports.getLogsByApi = async function (req, res, next) {
    let api = req.params.api;
    let logs = await logDb.findLogsByApi(api);
    res.json(logs);
};

