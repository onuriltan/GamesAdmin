const Game = require('../models/Game');

exports.getAll = async function () {
    return Game.find();
};
exports.getGames = async function (email) {
    return Game.find({email});
};

exports.getGame = async function (email, title) {
    return Game.findOne({email, title});
};

exports.createGame = async function (email, title) {
    const newGame = new Game({
        title,
        email
    });
    await newGame.save();
    return newGame;
};

exports.deleteGame = async function (email, title) {
    await Game.deleteOne({title: title, email: email});
};
