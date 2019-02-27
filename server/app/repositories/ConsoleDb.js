const Console = require('../models/Console');

exports.getConsoles = async function (email) {
    return Console.find({email});
};

exports.getConsole = async function (email, title) {
    return Console.findOne({email, title});
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
    await Console.deleteOne({title: title, email: email});
};
