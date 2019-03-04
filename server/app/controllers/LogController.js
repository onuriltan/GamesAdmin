const logDb = require('../repositories/LogDb')
const jwtHelper = require('../helpers/JwtHelper');

exports.getLogsByType = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);

    if (authData !== null && authData.role === "admin") {
        let type = req.params.type;
        let logs = await logDb.findLogsByType(type);
        res.json(logs);
    }else {
        return res.sendStatus(403);
    }
};

exports.getCrudLogs = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === "admin") {
        let logs = await logDb.getCrudLogs();
        res.json(logs);
    }else {
        return res.sendStatus(403);
    }
};

exports.deleteLogsByCategory = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    console.log(req)
    if (authData !== null && authData.role === "admin") {
        let category = req.params.category;
        await logDb.deleteByCategory(category);
        return res.sendStatus(200);
    }else {
        return res.sendStatus(403);
    }
};


