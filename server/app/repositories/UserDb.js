const User = require('../models/User');
const mongodb = require('mongodb');

exports.getUser = async function (email) {
    return User.findOne({email}).select('-__v');
};

exports.getUsersByRole = async function (role) {
    return User.find( { "role" : role}).select('-__v -password');
};

exports.getAll = async function () {
    return User.find().select('-__v, -password');
};

exports.getById = async function (id) {
    return User.findOne({_id:  new mongodb.ObjectID(id)}).select('-__v -_id -password -createdAt -updatedAt').lean().exec();
};

exports.addUser = async function (email, password, role, comment) {
    const newUser = new User({
        email,
        password,
        role,
        comment
    });
    await newUser.save();
    return newUser;
};

exports.deactivateUser = async function (user) {
    user.active = false;
    await user.save();
    return user;
};

exports.deleteUser = async function (email) {
    await User.deleteOne({email}).select('-__v');
};
