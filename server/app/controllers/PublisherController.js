const publisherDb = require('../repositories/PublisherDb');
const userDb = require('../repositories/UserDb');
const jwtHelper = require('../helpers/JwtHelper');
const logHelper = require('../helpers/LogHelper');
const publisherValidation = require('../validations/PublisherValidation');


exports.getAll = async function (req, res, next) {
    let publishers = await publisherDb.getAll();
    res.json(publishers);
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
        if(error) {
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
    if (authData !== null && authData.role === "admin") {
        let {email} = authData;
        let error = publisherValidation.validateDelete(req);
        if(error) {
            return res.status(400).send({error})
        }
        let id = req.body.id;
        let deletedConsole = await publisherDb.deletePublisherById(id);
        await logHelper.createLog(req, email, "crud");
        return res.sendStatus(200);
    }
    if (authData !== null &&  authData.role === "user") {
        let {email} = authData;
        let id = req.body.id;
        let error = publisherValidation.validateDelete(req);
        if(error) {
            return res.status(400).send({error})
        }
        let hasConsoleWithEmail = await publisherDb.getPublisherByEmailandId(email, id);
        if(hasConsoleWithEmail) {
            await publisherDb.deletePublisherById(id);
            await logHelper.createLog(req,email, "crud");
            return res.sendStatus(200);
        } else {
            return res.sendStatus(200);
        }
    }
    else {
        return res.sendStatus(403);
    }
};
