const publisherDb = require('../repositories/PublisherDb');
const logDb = require('../repositories/LogDb')
const jwtHelper = require('../helpers/JwtHelper');


exports.getAll = async function (req, res, next) {
    let publishers = await publisherDb.getAll();
    res.json(publishers);
};

exports.getPublishers = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null) {
        let {email} = authData;
        let publishers = await publisherDb.getPublishers(email);
        await createLog(req, email, "crud");
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
        if(publisher === null) {
            await createLog(req, email, "publisher");
        }
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
        await createLog(req, email, "crud");
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
        await createLog(req, email, "crud");
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
};

exports.deletePublisherById = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === "admin") {
        let {email} = authData;
        let id = req.body.id;
        console.log(id);
        let deletedConsole = await publisherDb.deletePublisherById(id);
        await createLog(req, email, "crud");
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
};

async function createLog(req, email, type) {
    let existingLog = await logDb.findLogsByPathandEmail(req.originalUrl, email);
    if(existingLog) {
        existingLog.count = existingLog.count +1;
        existingLog.save();
    }else {
        logDb.createLog(req.originalUrl, type, email, 1);
    }
}
