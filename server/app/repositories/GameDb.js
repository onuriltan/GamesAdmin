const Game = require('../models/Game');
const mongodb = require('mongodb');

exports.getAll = async function () {
    return Game.find().select('-__v');
};
exports.getGamesByUser = async function (userId) {
    return Game.find({userId}).select('-__v');
};

exports.getGameByUserandId = async function (userId, id) {
    return Game.findOne({userId, _id:  new mongodb.ObjectID(id)}).select('-__v');
};

exports.createGame = async function (data, userId) {
    let { name, dateReleased, publisherId } = data;
    const newGame = new Game({
        name,
        userId,
        publisherId,
        dateReleased
    });
    await newGame.save();
    return newGame;
};

exports.deleteGameById = async function (id) {
    return await Game.deleteOne({_id:  new mongodb.ObjectID(id)}).select('-__v');
};
