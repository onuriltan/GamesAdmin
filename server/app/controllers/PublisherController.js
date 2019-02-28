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
        await createCrudLog(req,email);
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
            logDb.createLog(title+' not found', "console", email);
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
        await createCrudLog(req,email);
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
        await createCrudLog(req,email);
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
        await createCrudLog(req,email);
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
};

async function createCrudLog(req, email) {
    let existingLog = await logDb.findLogsByPathandEmail(req.originalUrl, email);
    if(existingLog) {
        existingLog.count = existingLog.count +1;
        existingLog.save();
    }else {
        logDb.createLog(req.originalUrl, "crud", email, 1);
    }
}
