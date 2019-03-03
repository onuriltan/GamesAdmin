const gameDb = require('../repositories/GameDb');
const userDb = require('../repositories/UserDb');
const jwtHelper = require('../helpers/JwtHelper');
const logHelper = require('../helpers/LogHelper');
const gameValidation = require('../validations/GameValidation');

exports.getAll = async function (req, res, next) {
    let items = await gameDb.getAllPublic();
    return res.json(items);
};

exports.getAllByAdmin = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let items = await gameDb.getAll();
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
            let games = await gameDb.getGamesByUser(user.id);
            await logHelper.createLog(req, email, "crud");
            return res.json(games);
        } else {
            res.sendStatus(403);
        }
    } else {
        return res.sendStatus(403);
    }
};

exports.getByName = async function (req, res, next) {
    let items = await gameDb.getByName(req.params.name);
    if(items === null || items === undefined || items.length === 0) {
        await logHelper.createLog(req, '', "game");
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
            let newGame = await gameDb.createGame(req.body, user.id);
            await logHelper.createLog(req, email, "crud");
            return res.status(200).send({message: newGame.name + ' added'});
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
        let deletedGame = await gameDb.deleteGameById(itemId);
        await logHelper.createLog(req, email, "crud");
        return res.sendStatus(200);
    }
    if (authData !== null && authData.role === "user") {
        let error = gameValidation.validateDelete(req);
        if (error) {
            return res.status(400).send({error})
        }
        let user = await userDb.getUser(email);
        if (user) {
            let ownGame = await gameDb.getGameByUserandId(user._id, itemId);
            if(ownGame) {
                let deletedItem = await gameDb.deleteGameById(itemId);
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

