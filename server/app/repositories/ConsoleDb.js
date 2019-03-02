const Console = require('../models/Console');
const mongodb = require('mongodb');

exports.getAll = async function () {
    return Console.find().select('-__v');
};

exports.getConsoles = async function (email) {
    return Console.find({email}).select('-__v');
};

exports.getConsole = async function (email, name) {
    return Console.findOne({email, name}).select('-__v');
};

exports.getConsoleByEmailandId = async function (email, id) {
    return Console.findOne({email, _id:  new mongodb.ObjectID(id)}).select('-__v');
};

exports.createConsole = async function (data, email) {
    let {name, cpu, ram, year, comment} = data;
    const newConsole = new Console({
        name,
        email,
        cpu,
        ram,
        year,
        comment
    });
    await newConsole.save();
    return newConsole;
};

exports.deleteConsole = async function (email, name) {
    return await Console.deleteOne({name: name, email: email}).select('-__v');
};

exports.deleteConsoleById = async function (id) {
    return await Console.deleteOne({_id:  new mongodb.ObjectID(id)}).select('-__v');
};
