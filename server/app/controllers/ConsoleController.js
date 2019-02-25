const Console = require('../models/Console');
const jwtHelper = require('../helpers/JwtHelper');

exports.getConsoles = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        Console.find({email}, function (err, consoles) {
            if (err) {
                res.send(err);
            }
            res.json(consoles);
        });
    } else {
        res.sendStatus(403);
    }
};

exports.getConsole = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let title = req.params.consolename;
        let {email} = authData;
        Console.findOne({email, title}, function (err, consoles) {
            if (err) {
                res.send(err);
            }
            res.json(consoles);
        });
    } else {
        res.sendStatus(403);
    }
};

exports.createConsole = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let title = req.body.title;
        const newConsole = new Console({
            title,
            email
        });
        await newConsole.save();
        res.json(newConsole);
    } else {
        res.sendStatus(403);
    }
};

exports.deleteConsole = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let title = req.params.consolename;
        await Console.deleteOne({title: title, email: email});
        res.sendStatus(200);

    } else {
        res.sendStatus(403);
    }
};
