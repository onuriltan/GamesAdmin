let Console = require('../models/Console');

exports.getConsoles = function(req, res, next){
    Console.find(function(err, consoles) {
        if (err){
            res.send(err);
        }
        res.json(consoles);
    });
};

exports.getConsole = function(req, res, next){
    Console.find({
        _id : req.params.game_id
    }, function(err, console) {
        res.json(console);
    });
};

exports.createConsole = function(req, res, next){
    Console.create({
        title : req.body.title
    }, function(err, console) {
        if (err){
            res.send(err);
        }
        Console.find(function(err, consoles) {
            if (err){
                res.send(err);
            }
            res.json(consoles);
        });
    });
};

exports.deleteConsole = function(req, res, next){
    Console.remove({
        _id : req.params.console_id
    }, function(err, console) {
        res.json(console);
    });
};
