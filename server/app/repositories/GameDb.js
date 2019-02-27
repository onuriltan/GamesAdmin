const Game = require('../models/Game');
const mongodb = require('mongodb');

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
    await newGame.save();
    return newGame;
};

exports.deleteGame = async function (email, title) {
    return await Game.deleteOne({title: title, email: email}).select('-__v');
};

exports.deleteGameById = async function (id) {
    return await Game.deleteOne({_id:  new mongodb.ObjectID(id)}).select('-__v');
};
