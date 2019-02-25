const Publisher = require('../models/Publisher');
const jwtHelper = require('../helpers/JwtHelper');

exports.getPublishers = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        Publisher.find({email}, function (err, publishers) {
            if (err) {
                res.send(err);
            }
            res.json(publishers);
        });
    } else {
        res.sendStatus(403);
    }
};

exports.getPublisher = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let title = req.params.publishername;
        let {email} = authData;
        Publisher.findOne({email, title}, function (err, publishers) {
            if (err) {
                res.send(err);
            }
            res.json(publishers);
        });
    } else {
        res.sendStatus(403);
    }
};

exports.createPublisher = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let title = req.body.title;
        const newPublisher = new Publisher({
            title,
            email
        });
        await newPublisher.save();
        res.json(newPublisher);
    } else {
        res.sendStatus(403);
    }
};

exports.deletePublisher = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let title = req.params.publishername;
        await Publisher.deleteOne({title: title, email: email});
        res.sendStatus(200);

    } else {
        res.sendStatus(403);
    }
};
