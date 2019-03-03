const Console = require('../models/Console');
const mongodb = require('mongodb');


exports.getAllPublic = async function () {
    return Console.find().select('-__v, -userId');
};

exports.getAll = async function () {
    return Console.find().select('-__v');
};

exports.getByName = async function (name) {
    return Console.find({name}).select('-__v, -userId');
};

exports.getConsolesByUser = async function (userId) {
    return Console.find({userId}).select('-__v');
};

exports.getConsoleByUserandId = async function (userId, id) {
    return Console.findOne({userId, _id:  new mongodb.ObjectID(id)}).select('-__v');
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
    return await Console.deleteOne({_id:  new mongodb.ObjectID(id)}).select('-__v');
};
