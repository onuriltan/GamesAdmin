const consoleDb = require('../repositories/ConsoleDb');
const userDb = require('../repositories/UserDb');
const jwtHelper = require('../helpers/JwtHelper');
const logHelper = require('../helpers/LogHelper');
const consoleValidation = require('../validations/ConsoleValidation');


exports.getAll = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let items = await consoleDb.getAll();
        for (item of items) {
            let user = await userDb.getById(item.userId);
            delete item.userId;
            item.user = user;
        }
        return res.json(items);
    } else {
        res.sendStatus(403);
    }
};

exports.getByName = async function (req, res, next) {
    let items = await consoleDb.getByName(req.params.name);
    if (items === null || items === undefined || items.length === 0) {
        await logHelper.createLog(req.params.name + ' console not found.', '', "console-notfound");
    }
    return res.json(items);
};

exports.create = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let error = consoleValidation.validateCreate(req);
        if (error) {
            return res.status(400).send({error})
        }
        let user = await userDb.getUser(email);
        if (user) {
            let newItem = await consoleDb.createConsole(req.body, user.id);
            await logHelper.createLog(newItem.name + ' console created.', email, "console-crud");
            return res.status(200).send({message: newItem.name + ' added'});
        } else {
            return res.sendStatus(403);
        }
    } else {
        return res.sendStatus(403);
    }
};

exports.delete = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    let itemId = req.body.id;
    if (authData !== null) {
        let {email} = authData;
        let error = consoleValidation.validateDelete(req);
        if (error) {
            return res.status(400).send({error})
        }
        let existingItem = await consoleDb.getById(itemId);
        if (existingItem) {
            await consoleDb.deleteConsoleById(itemId);
            await logHelper.createLog(existingItem.name + ' console deleted.', email, "console-crud");
            return res.sendStatus(200);
        } else {
            return res.status(404).send({error: "Console not found"});
        }
    } else {
        return res.sendStatus(403);
    }
};

exports.update = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let error = consoleValidation.validateUpdate(req);
        if (error) {
            return res.status(400).send({error})
        }
        let {oldName, name, cpu, ram, year, comment} = req.body;
        let item = await consoleDb.getByExactName(oldName);
        if (item) {
            if (name) item.name = name;
            if (cpu) item.cpu = cpu;
            if (ram) item.ram = ram;
            if (year) item.year = year;
            if (comment) item.comment = comment;
            item.save();
            await logHelper.createLog(oldName + ' console updated.', authData.email, "console-crud");
            return res.status(200).send({message: oldName + ' updated'});
        } else {
            return res.status(404).send({message: oldName + ' not found'});
        }
    } else {
        res.sendStatus(403);
    }
};
