const consoleDb = require('../repositories/ConsoleDb');
const jwtHelper = require('../helpers/JwtHelper');
const logHelper = require('../helpers/LogHelper');

exports.getAll = async function (req, res, next) {
    let consoles = await consoleDb.getAll();
    res.json(consoles);
};

exports.getConsoles = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        await logHelper.createLog(req, email, "crud");
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
        if(console === null) {
            await logHelper.createLog(req+" not found", email, "console");
        }
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
        await logHelper.createLog(req, email, "crud");
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
        await logHelper.createLog(req, email, "crud");
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
};

exports.deleteConsoleById = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === "admin") {
        let {email} = authData;
        let id = req.body.id;
        console.log(id);
        let deletedConsole = await consoleDb.deleteConsoleById(id);
        await logHelper.createLog(req, email, "crud");
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
};
