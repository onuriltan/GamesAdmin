const gameDb = require('../repositories/GameDb');
const consoleDb = require('../repositories/ConsoleDb');
const publisherDb = require('../repositories/PublisherDb');
const userDb = require('../repositories/UserDb');
const jwtHelper = require('../helpers/JwtHelper');
const logHelper = require('../helpers/LogHelper');
const gameValidation = require('../validations/GameValidation');

exports.getAll = async function (req, res, next) {
    let items = await gameDb.getAllPublic();
    for (item of items) {
        let consolee = await consoleDb.getById(item.consoleId);
        let publisher = await publisherDb.getById(item.publisherId);
        delete item.consoleId;
        delete item.publisherId;
        item.console = consolee;
        item.publisher = publisher;
    }
    return res.json(items);
};

exports.getAllByAdmin = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === "admin") {
        let items = await gameDb.getAll();
        for (item of items) {
            let consolee = await consoleDb.getById(item.consoleId);
            let publisher = await publisherDb.getById(item.publisherId);
            let user = await userDb.getById(item.userId);
            delete item.userId;
            item.user = user;
            item.console = consolee;
            item.publisher = publisher;
        }
        res.json(items);
    } else {
        res.sendStatus(403);
    }
};

exports.getAllByUser = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let user = await userDb.getUser(email);
        if (user) {
            let items = await gameDb.getGamesByUser(user.id);
            for (item of items) {
                let consolee = await consoleDb.getById(item.consoleId);
                let publisher = await publisherDb.getById(item.publisherId);
                delete item.consoleId;
                delete item.publisherId;
                item.console = consolee;
                item.publisher = publisher;
            }
            return res.json(items);
        } else {
            res.sendStatus(403);
        }
    } else {
        return res.sendStatus(403);
    }
};

exports.getByName = async function (req, res, next) {
    let items = await gameDb.getByName(req.params.name);
    for (item of items) {
        let consolee = await consoleDb.getById(item.consoleId);
        let publisher = await publisherDb.getById(item.publisherId);
        item.console = consolee;
        item.publisher = publisher;
    }
    if (items === null || items === undefined || items.length === 0) {
        await logHelper.createLog(req.params.name + ' game not found.', '', "game-notfound");
    }
    return res.json(items);
};

exports.createByUser = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let error = gameValidation.validateCreate(req);
        if (error) {
            return res.status(400).send({error})
        }
        let user = await userDb.getUser(email);
        if (user) {
            let newItem = await gameDb.createGame(req.body, user.id);
            await logHelper.createLog(newItem.name + ' game created.', email, "game-crud");
            return res.status(200).send({message: newItem.name + ' added'});
        } else {
            return res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
};


exports.deleteById = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    let {email} = authData;
    let itemId = req.body.id;
    if (authData !== null && authData.role === "admin") {
        let {email} = authData;
        let error = gameValidation.validateDelete(req);
        if (error) {
            return res.status(400).send({error})
        }
        let existingItem = await gameDb.getById(itemId);
        if (existingItem) {
            await gameDb.deleteGameById(itemId);
            await logHelper.createLog(existingItem.name + ' game deleted.', email, "game-crud");
            return res.sendStatus(200);
        } else {
            return res.status(404).send({error: "Game not found"});
        }
    }
    if (authData !== null && authData.role === "user") {
        let error = gameValidation.validateDelete(req);
        if (error) {
            return res.status(400).send({error})
        }
        let user = await userDb.getUser(email);
        if (user) {
            let ownItem = await gameDb.getGameByUserandId(user._id, itemId);
            if (ownItem) {
                await gameDb.deleteGameById(itemId);
                await logHelper.createLog(ownItem.name + ' game deleted.', email, "game-crud");
                return res.status(200).send({message: ownItem.name + ' deleted'});
            } else {
                return res.sendStatus(403);
            }
        } else {
            return res.sendStatus(403);
        }
    } else {
        return res.sendStatus(403);
    }
};


exports.updateByUser = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let user = await userDb.getUser(email);
        if (user) {
            let {oldName, name, consoleId, publisherId, dateReleased} = req.body;
            let item = await gameDb.getByExactName(oldName);
            if (item) {
                if (name) item.name = name;
                if (consoleId) item.consoleId = consoleId;
                if (publisherId) item.publisherId = publisherId;
                if (dateReleased) item.dateReleased = dateReleased;
                item.save();
                await logHelper.createLog(oldName + ' game updated.', email, "game-crud");
                return res.status(200).send({message: oldName + ' updated'});
            } else {
                return res.status(404).send({message: oldName + ' not found'});
            }
        } else {
            return res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
};

exports.updateByAdmin = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === "admin") {
        let {email} = authData;
        let {oldName, name, consoleId, publisherId, dateReleased} = req.body;
        let item = await gameDb.getByExactName(oldName);
        if (item) {
            if (name) item.name = name;
            if (consoleId) item.consoleId = consoleId;
            if (publisherId) item.publisherId = publisherId;
            if (dateReleased) item.dateReleased = dateReleased;
            item.save();
            await logHelper.createLog(oldName + ' game updated.', email, "game-crud");
            return res.status(200).send({message: oldName + ' updated'});
        } else {
            return res.status(404).send({message: oldName + ' not found'});
        }
    } else {
        res.sendStatus(403);
    }
};

