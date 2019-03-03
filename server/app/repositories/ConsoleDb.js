const Console = require('../models/Console');
const mongodb = require('mongodb');

exports.getAll = async function () {
    return Console.find().select('-__v');
};

exports.getConsolesByUser = async function (userId) {
    return Console.find({userId}).select('-__v');
};

exports.getConsoleByEmailandId = async function (email, id) {
    return Console.findOne({email, _id:  new mongodb.ObjectID(id)}).select('-__v');
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
