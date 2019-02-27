const Console = require('../models/Console');
const mongodb = require('mongodb');

exports.getAll = async function () {
    return Console.find().select('-__v');
};

exports.getConsoles = async function (email) {
    return Console.find({email}).select('-__v');
};

exports.getConsole = async function (email, title) {
    return Console.findOne({email, title}).select('-__v');
};

exports.createConsole = async function (email, title) {
    const newConsole = new Console({
        title,
        email
    });
    await newConsole.save();
    return newConsole;
};

exports.deleteConsole = async function (email, title) {
    return await Console.deleteOne({title: title, email: email}).select('-__v');
};

exports.deleteConsoleById = async function (id) {
    return await Console.deleteOne({_id:  new mongodb.ObjectID(id)}).select('-__v');
};
