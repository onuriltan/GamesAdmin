const consoleDb = require('../repositories/ConsoleDb');
const logDb = require('../repositories/LogDb')
const jwtHelper = require('../helpers/JwtHelper');

exports.getAll = async function (req, res, next) {
    let consoles = await consoleDb.getAll();
    res.json(consoles);

};


exports.getConsoles = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        logDb.createLog("getConsoles api called", "console", email);
        let consoles = await consoleDb.getConsoles(email);
        for(let console of consoles) {
            logDb.createLog(console.title+' called', "console", email);
        }
        res.json(consoles);
    } else {
        res.sendStatus(403);
    }
};

exports.getConsole = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let title = req.params.consolename;
        let {email} = authData;
        let console = await consoleDb.getConsole(email, title);
        logDb.createLog(console.title+' found', "console", email);
        res.json(console);
    } else {
        res.sendStatus(403);
    }
};

exports.createConsole = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let title = req.body.title;
        let newConsole = await consoleDb.createConsole(email, title);
        logDb.createLog(title+" created", "console", email);
        res.json(newConsole);
    } else {
        res.sendStatus(403);
    }
};

exports.deleteConsole = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let title = req.params.consolename;
        await consoleDb.deleteConsole(email,title);
        logDb.createLog(title+" deleted", "console", email);
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
};
