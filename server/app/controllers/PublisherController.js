let Publisher = require('../models/Publisher');

exports.getPublishers = function(req, res, next){
    Publisher.find(function(err, publishers) {
        if (err){
            res.send(err);
        }
        res.json(publishers);
    });
};

exports.getPublisher = function(req, res, next){
    Publisher.find({
        _id : req.params.publisher_id
    }, function(err, publisher) {
        res.json(publisher);
    });
};

exports.createPublisher = function(req, res, next){
    Publisher.create({
        title : req.body.title
    }, function(err, publisher) {
        if (err){
            res.send(err);
        }
        Publisher.find(function(err, publishers) {
            if (err){
                res.send(err);
            }
            res.json(publishers);
        });
    });
};

exports.deletePublisher = function(req, res, next){
    Publisher.remove({
        _id : req.params.publisher_id
    }, function(err, publisher) {
        res.json(publisher);
    });
};
