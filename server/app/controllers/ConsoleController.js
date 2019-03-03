const consoleDb = require('../repositories/ConsoleDb');
const userDb = require('../repositories/UserDb');
const jwtHelper = require('../helpers/JwtHelper');
const logHelper = require('../helpers/LogHelper');
const consoleValidation = require('../validations/ConsoleValidation');

exports.getAll = async function (req, res, next) {
    let consoles = await consoleDb.getAll();
    res.json(consoles);
};

exports.getAllByUser = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let user = await userDb.getUser(email);
        if (user) {
            let items = await consoleDb.getConsolesByUser(user.id);
            await logHelper.createLog(req, email, "crud");
            return res.json(items);
        } else {
            res.sendStatus(403);
        }
    } else {
        return res.sendStatus(403);
    }
};

exports.createByUser = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let error = consoleValidation.validateCreate(req);
        if(error) {
            return res.status(400).send({error})
        }
        let user = await userDb.getUser(email);
        if (user) {
            let newItem = await consoleDb.createConsole(req.body, user.id);
            await logHelper.createLog(req, email, "crud");
            return res.status(200).send({message: newItem.name + ' added'});
        } else {
            return res.sendStatus(403);
        }
    } else {
        return res.sendStatus(403);
    }
};

exports.deleteById = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === "admin") {
        let {email} = authData;
        let error = consoleValidation.validateDelete(req);
        if(error) {
            return res.status(400).send({error})
        }
        let id = req.body.id;
        let deletedConsole = await consoleDb.deleteConsoleById(id);
        await logHelper.createLog(req, email, "crud");
        res.sendStatus(200);
    }
    if (authData !== null &&  authData.role === "user") {
        let {email} = authData;
        let id = req.body.id;
        let error = consoleValidation.validateDelete(req);
        if(error) {
            return res.status(400).send({error})
        }
        let hasConsoleWithEmail = await consoleDb.getConsoleByEmailandId(email, id);
        if(hasConsoleWithEmail) {
            await consoleDb.deleteConsoleById(id);
            await logHelper.createLog(req,email, "crud");
            res.sendStatus(200);
        } else {
            res.sendStatus(200);
        }
    }else {
        res.sendStatus(403);
    }
};
