let Game = require('../models/game');

exports.getGames = function(req, res, next){
    Game.find(function(err, games) {
        if (err){
            res.send(err);
        }
        res.json(games);
    });
};

exports.getGame = function(req, res, next){
    Game.find({
        _id : req.params.game_id
    }, function(err, game) {
        res.json(game);
    });
};

exports.createGame = function(req, res, next){
    Game.create({
        title : req.body.title
    }, function(err, game) {
        if (err){
            res.send(err);
        }
        Game.find(function(err, games) {
            if (err){
                res.send(err);
            }
            res.json(games);
        });
    });
};

exports.deleteGame = function(req, res, next){
    Game.remove({
        _id : req.params.game_id
    }, function(err, game) {
        res.json(game);
    });
};
