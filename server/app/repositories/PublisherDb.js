const Publisher = require('../models/Publisher');
const mongodb = require('mongodb');

exports.getAll = async function () {
    return Publisher.find().select('-__v');
};

exports.getAllPublic = async function () {
    return Publisher.find().select('-__v, -userId');
};

exports.getPublishersByUser = async function (userId) {
    return Publisher.find({userId}).select('-__v');
};

exports.getByName = async function (name) {
    return Publisher.find({name}).select('-__v, -userId');
};

exports.getPublisherByUserandId = async function (userId, id) {
    return Publisher.findOne({userId, _id:  new mongodb.ObjectID(id)}).select('-__v');
};

exports.createPublisher = async function (data, userId) {
    let {name, location, comment} = data;
    const newPublisher = new Publisher({
        name,
        userId,
        location,
        comment
    });
    await newPublisher.save();
    return newPublisher;
};

exports.deletePublisher = async function (email, name) {
    await Publisher.deleteOne({name: name, email: email}).select('-__v');
};

exports.deletePublisherById = async function (id) {
    return await Publisher.deleteOne({_id:  new mongodb.ObjectID(id)}).select('-__v');
};
