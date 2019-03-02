const gameDb = require('../repositories/GameDb');
const jwtHelper = require('../helpers/JwtHelper');
const logHelper = require('../helpers/LogHelper');
const gameValidation = require('../validations/GameValidation');

exports.getAll = async function (req, res, next) {
    let games = await gameDb.getAll();
    res.json(games);
};

exports.getGames = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let games = await gameDb.getGames(email);
        await logHelper.createLog(req, email, "crud");
        res.json(games);
    } else {
        res.sendStatus(403);
    }
};

exports.createGame = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let error = gameValidation.validateCreateGame(req);
        if(error) {
            return res.status(400).send({error})
        }
        let newGame = await gameDb.createGame(req.body, email);
        await logHelper.createLog(req,email,"crud");
        return res.status(200).send({message: newGame.name+' added'});
    } else {
        res.sendStatus(403);
    }
};


exports.deleteGameById = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null &&  authData.role === "admin") {
        let {email} = authData;
        let id = req.body.id;
        let error = gameValidation.validatedeleteGame(req);
        if(error) {
            return res.status(400).send({error})
        }
        let deletedGame = await gameDb.deleteGameById(id);
        await logHelper.createLog(req,email, "crud");
        return res.sendStatus(200);
    }
    if (authData !== null &&  authData.role === "user") {
        let {email} = authData;
        let id = req.body.id;
        let hasGameWithEmail = await gameDb.getGameByEmailandId(email, id);
        if(hasGameWithEmail) {
            await gameDb.deleteGameById(id);
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

