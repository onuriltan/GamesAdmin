const gameDb = require('../repositories/GameDb');
const logDb = require('../repositories/LogDb')
const jwtHelper = require('../helpers/JwtHelper');

exports.getAll = async function (req, res, next) {
    let games = await gameDb.getAll();
    res.json(games);

};


exports.getGames = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        logDb.createLog("getGames api called", "game", email);
        let games = await gameDb.getGames(email);
        for (let game of games) {
            logDb.createLog(game.title + ' called', "game", email);
        }
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
        if(game !== null) {
            logDb.createLog(game.title+' found', "game", email);
        }else {
            logDb.createLog(title+' not found', "game", email);
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
        let title = req.body.title;
        let newGame = await gameDb.createGame(email, title);
        logDb.createLog(title+" created", "game", email);
        res.json(newGame);
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
        logDb.createLog(title+" deleted", "game", email);
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
        console.log(id);
        let deletedGame = await gameDb.deleteGameById(id);
        logDb.createLog(deletedGame.title+" deleted", "game", email);
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
};
