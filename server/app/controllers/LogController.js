const logDb = require('../repositories/LogDb')
const jwtHelper = require('../helpers/JwtHelper');

exports.getLogsByApi = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === 'admin') {
        let api = req.params.api;
        let logs = await logDb.findLogsByApi(api);
        res.json(logs);
    } else {
        res.sendStatus(403);
    }
};

