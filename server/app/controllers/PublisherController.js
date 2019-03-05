const publisherDb = require('../repositories/PublisherDb');
const userDb = require('../repositories/UserDb');
const jwtHelper = require('../helpers/JwtHelper');
const logHelper = require('../helpers/LogHelper');
const publisherValidation = require('../validations/PublisherValidation');


exports.getAll = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let items = await publisherDb.getAll();
        for (item of items) {
            let user = await userDb.getById(item.userId);
            delete item.userId;
            item.user = user;
        }
        return res.json(items);
    } else {
        return res.sendStatus(403);
    }
};


exports.getByName = async function (req, res, next) {
    let items = await publisherDb.getByName(req.params.name);
    if (items === null || items === undefined || items.length === 0) {
        await logHelper.createLog(req.params.name + ' publisher not found.', '', "publisher-notfound");
    }
    return res.json(items);
};

exports.create = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let error = publisherValidation.validateCreate(req);
        if (error) {
            return res.status(400).send({error})
        }
        let user = await userDb.getUser(email);
        if (user) {
            let newItem = await publisherDb.createPublisher(req.body, user.id);
            await logHelper.createLog(newItem.name + ' publisher created.', email, "publisher-crud");
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
        let error = publisherValidation.validateDelete(req);
        if (error) {
            return res.status(400).send({error})
        }
        let existingItem = await publisherDb.getById(itemId);
        if (existingItem) {
            await publisherDb.deleteById(itemId);
            await logHelper.createLog(existingItem.name + ' publisher deleted.', email, "publisher-crud");
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
        let error = publisherValidation.validateUpdate(req);
        if (error) {
            return res.status(400).send({error})
        }
        let {oldName, name, location, comment} = req.body;
        let item = await publisherDb.getByExactName(oldName);
        if (item) {
            if (name) item.name = name;
            if (location) item.location = location;
            if (comment) item.comment = comment;
            item.save();
            await logHelper.createLog(oldName + ' publisher updated.', authData.email, "publisher-crud");
            return res.status(200).send({message: oldName + ' updated'});
        } else {
            return res.status(404).send({message: oldName + ' not found'});
        }
    } else {
        res.sendStatus(403);
    }
};
