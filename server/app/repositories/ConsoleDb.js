const Console = require('../models/Console');
const mongodb = require('mongodb');

exports.getAll = async function () {
    return Console.find().select('-__v').lean().exec();
};

exports.getById = async function (id) {
    return Console.findOne({_id: new mongodb.ObjectID(id)}).select('-__v -_id -userId -createdAt -updatedAt').lean().exec();
};

exports.getByName = async function (name) {
    let regex = new RegExp(`${name}`, "i");
    return Console.find({"name": {$regex: regex}}).select('-__v -_id -userId -createdAt -updatedAt').lean().exec();
};

exports.getByExactName = async function (name) {
    return Console.findOne({name});
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
    return await Console.deleteOne({_id: new mongodb.ObjectID(id)}).select('-__v').lean().exec();
};
