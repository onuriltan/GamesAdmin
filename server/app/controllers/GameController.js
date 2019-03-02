const gameDb = require('../repositories/GameDb');
const jwtHelper = require('../helpers/JwtHelper');
const logHelper = require('../helpers/LogHelper');

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

exports.getGame = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let title = req.params.gamename;
        let {email} = authData;
        let game = await gameDb.getGame(email, title);
        if(game === null) {
            await logHelper.createLog(req +" not found",email,"game");
        }
        res.json(game);
    } else {
        res.sendStatus(403);
    }
};

exports.createGame = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let newGame = await gameDb.createGame(req.body, email);
        await logHelper.createLog(req,email,"crud");
        return res.status(200).send({message: newGame.name+' added'});
    } else {
        res.sendStatus(403);
    }
};

exports.deleteGame = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let title = req.params.gamename;
        await gameDb.deleteGame(email, title);
        await logHelper.createLog(req,email,"crud");
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
};

exports.deleteGameById = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null &&  authData.role === "admin") {
        let {email} = authData;
        let id = req.body.id;
        let deletedGame = await gameDb.deleteGameById(id);
        await logHelper.createLog(req,email, "crud");
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
};

