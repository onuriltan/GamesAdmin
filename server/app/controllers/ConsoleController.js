const consoleDb = require('../repositories/ConsoleDb');
const jwtHelper = require('../helpers/JwtHelper');

exports.getConsoles = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let consoles = await consoleDb.getConsoles(email);
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
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
};
