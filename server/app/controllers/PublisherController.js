const jwtHelper = require('../helpers/JwtHelper');
const publisherDb = require('../db/PublisherDb');

exports.getPublishers = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let publishers = await publisherDb.getPublishers(email);
        res.json(publishers);
    } else {
        res.sendStatus(403);
    }
};

exports.getPublisher = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let title = req.params.publishername;
        let {email} = authData;
        let publisher = await publisherDb.getPublisher(email, title);
        res.json(publisher);
    } else {
        res.sendStatus(403);
    }
};

exports.createPublisher = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let title = req.body.title;
        let newPublisher = await publisherDb.createPublisher(email, title);
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
        await publisherDb.deletePublisher(email,title);
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
};
