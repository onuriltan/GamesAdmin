const User = require('../models/User');

exports.getUser = async function (email) {
    return User.findOne({email}).select('-__v');
};

exports.getUsersByRole = async function (role) {
    return User.find( { "role" : role}).select('-__v');
};

exports.addUser = async function (email, password, role) {
    const newUser = new User({
        email,
        password,
        role
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
