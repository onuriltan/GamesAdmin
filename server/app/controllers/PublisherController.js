const publisherDb = require('../repositories/PublisherDb');
const userDb = require('../repositories/UserDb');
const jwtHelper = require('../helpers/JwtHelper');
const logHelper = require('../helpers/LogHelper');
const publisherValidation = require('../validations/PublisherValidation');


exports.getAllByAdmin = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let items = await publisherDb.getAll();
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
            let items = await publisherDb.getPublishersByUser(user.id);
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
        let error = publisherValidation.validateCreate(req);
        if (error) {
            return res.status(400).send({error})
        }
        let user = await userDb.getUser(email);
        if (user) {
            let newGame = await publisherDb.createPublisher(req.body, user.id);
            await logHelper.createLog(req, email, "crud");
            return res.status(200).send({message: newGame.name + ' added'});
        } else {
            return res.sendStatus(403);
        }
    } else {
        return res.sendStatus(403);
    }
};

exports.deleteById = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    let {email} = authData;
    let itemId = req.body.id;
    if (authData !== null && authData.role === "admin") {
        let {email} = authData;
        let error = publisherValidation.validateDelete(req);
        if (error) {
            return res.status(400).send({error})
        }
        let deletedItem = await publisherDb.deletePublisherById(itemId);
        await logHelper.createLog(req, email, "crud");
        return res.status(200).send({message: deletedItem.name + ' deleted'});
    }
    if (authData !== null && authData.role === "user") {
        let error = publisherValidation.validateDelete(req);
        if (error) {
            return res.status(400).send({error})
        }
        let user = await userDb.getUser(email);
        if (user) {
            let ownGame = await publisherDb.getPublisherByUserandId(user._id, itemId);
            if (ownGame) {
                let deletedItem = await publisherDb.deletePublisherById(itemId);
                await logHelper.createLog(req, email, "crud");
                return res.status(200).send({message: deletedItem.name + ' deleted'});
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
