const gameDb = require('../repositories/GameDb');
const userDb = require('../repositories/UserDb');
const jwtHelper = require('../helpers/JwtHelper');
const logHelper = require('../helpers/LogHelper');
const gameValidation = require('../validations/GameValidation');

exports.getAll = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let games = await gameDb.getAll();
        res.json(games);
    } else {
        return res.sendStatus(403);
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
    if (authData !== null && authData.role === "admin") {
        let {email} = authData;
        let id = req.body.id;
        let error = gameValidation.validateDelete(req);
        if (error) {
            return res.status(400).send({error})
        }
        let deletedGame = await gameDb.deleteGameById(id);
        await logHelper.createLog(req, email, "crud");
        return res.sendStatus(200);
    }
    if (authData !== null && authData.role === "user") {
        let {email} = authData;
        let id = req.body.id;
        let error = gameValidation.validateDelete(req);
        if (error) {
            return res.status(400).send({error})
        }
        let hasGameWithEmail = await gameDb.getGameByEmailandId(email, id);
        if (hasGameWithEmail) {
            await gameDb.deleteGameById(id);
            await logHelper.createLog(req, email, "crud");
            return res.sendStatus(200);
        } else {
            return res.sendStatus(200);
        }
    } else {
        return res.sendStatus(403);
    }
};

