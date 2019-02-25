const Game = require('../models/Game');
const jwtHelper = require('../helpers/JwtHelper');

exports.getGames = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        Game.find({email}, function (err, games) {
            if (err) {
                res.send(err);
            }
            res.json(games);
        });
    } else {
        res.sendStatus(403);
    }
};

exports.getGame = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let title = req.params.gamename;
        let {email} = authData;
        Game.findOne({email, title}, function (err, games) {
            if (err) {
                res.send(err);
            }
            res.json(games);
        });
    } else {
        res.sendStatus(403);
    }
};

exports.createGame = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let title = req.body.title;
        const newGame = new Game({
            title,
            email
        });
        await newGame.save();
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
        console.log(title)
        await Game.deleteOne({title: title, email: email});
        res.sendStatus(200);

    } else {
        res.sendStatus(403);
    }
};
