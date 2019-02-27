const Game = require('../models/Game');

exports.getAll = async function () {
    return Game.find().select('-__v');
};
exports.getGames = async function (email) {
    return Game.find({email}).select('-__v');
};

exports.getGame = async function (email, title) {
    return Game.findOne({email, title}).select('-__v');
};

exports.createGame = async function (email, title) {
    const newGame = new Game({
        title,
        email
    });
    await newGame.save().select('-__v');
    return newGame;
};

exports.deleteGame = async function (email, title) {
    await Game.deleteOne({title: title, email: email}).select('-__v');
};
