const Game = require('../models/Game');
const mongodb = require('mongodb');

exports.getAllPublic = async function () {
    return Game.find().select('-__v -_id -userId -createdAt -updatedAt').lean().exec();
};

exports.getAll = async function () {
    return Game.find().select('-__v').lean().exec();
};
exports.getGamesByUser = async function (userId) {
    return Game.find({userId}).select('-__v').lean().exec();
};

exports.getByName = async function (name) {
    let regex = new RegExp(`${name}`, "i");
    return Game.find({"name": {$regex: regex}}).select('-__v -_id -userId -createdAt -updatedAt').lean().exec();

};

exports.getById = async function (id) {
    return Console.findOne({_id:  new mongodb.ObjectID(id)}).select('-__v').lean().exec();
};

exports.getGameByUserandId = async function (userId, id) {
    return Game.findOne({userId, _id:  new mongodb.ObjectID(id)}).select('-__v').lean().exec();
};

exports.createGame = async function (data, userId) {
    let { name, dateReleased, publisherId, consoleId } = data;
    const newGame = new Game({
        name,
        userId,
        consoleId,
        publisherId,
        dateReleased
    });
    await newGame.save();
    return newGame;
};

exports.deleteGameById = async function (id) {
    return await Game.deleteOne({_id:  new mongodb.ObjectID(id)}).select('-__v');
};
