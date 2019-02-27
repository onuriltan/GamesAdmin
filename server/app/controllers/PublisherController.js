const publisherDb = require('../repositories/PublisherDb');
const logDb = require('../repositories/LogDb')
const jwtHelper = require('../helpers/JwtHelper');


exports.getPublishers = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        logDb.createLog("getPublishers api called", "publisher", email);
        let publishers = await publisherDb.getPublishers(email);
        for (let publisher of publishers) {
            logDb.createLog(publisher.title + ' called', "publisher", email);
        }
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
        logDb.createLog(publisher.title+' found', "publisher", email);
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
        logDb.createLog(title+" created", "publisher", email);
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
        logDb.createLog(title+" deleted", "publisher", email);
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
};
