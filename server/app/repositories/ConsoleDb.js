const Console = require('../models/Console');
const mongodb = require('mongodb');


exports.getAllPublic = async function () {
    return Console.find().select('-__v -_id -userId -createdAt -updatedAt').lean().exec();
};

exports.getAll = async function () {
    return Console.find().select('-__v').lean().exec();
};

exports.getById = async function (id) {
    return Console.findOne({_id:  new mongodb.ObjectID(id)}).select('-__v -_id -userId -createdAt -updatedAt').lean().exec();
};

exports.getByName = async function (name) {
    return Console.find({name}).select('-__v -_id -userId -createdAt -updatedAt').lean().exec();
};

exports.getConsolesByUser = async function (userId) {
    return Console.find({userId}).select('-__v').lean().exec();
};

exports.getConsoleByUserandId = async function (userId, id) {
    return Console.findOne({userId, _id:  new mongodb.ObjectID(id)}).select('-__v').lean().exec();
};

exports.createConsole = async function (data, userId) {
    let {name, cpu, ram, year, comment} = data;
    const newConsole = new Console({
        name,
        userId,
        cpu,
        ram,
        year,
        comment
    });
    await newConsole.save();
    return newConsole;
};

exports.deleteConsoleById = async function (id) {
    return await Console.deleteOne({_id:  new mongodb.ObjectID(id)}).select('-__v').lean().exec();
};
