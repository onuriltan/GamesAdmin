const Game = require('../models/Game');
const mongodb = require('mongodb');

exports.getAll = async function () {
    return Game.find().select('-__v');
};
exports.getGames = async function (email) {
    return Game.find({email}).select('-__v');
};

exports.getGameByEmailandId = async function (email, id) {
    return Game.findOne({email, _id:  new mongodb.ObjectID(id)}).select('-__v');
};

exports.createGame = async function (data, email) {
    let { name, dateReleased, publisherId } = data;
    const newGame = new Game({
        name,
        email,
        publisherId,
        dateReleased
    });
    await newGame.save();
    return newGame;
};

exports.deleteGame = async function (email, name) {
    return await Game.deleteOne({name: name, email: email}).select('-__v');
};

exports.deleteGameById = async function (id) {
    return await Game.deleteOne({_id:  new mongodb.ObjectID(id)}).select('-__v');
};
