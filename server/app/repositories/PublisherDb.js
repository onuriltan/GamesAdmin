const Publisher = require('../models/Publisher');
const mongodb = require('mongodb');

exports.getAll = async function () {
    return Publisher.find().select('-__v');
};

exports.getPublishers = async function (email) {
    return Publisher.find({email}).select('-__v');
};

exports.getPublisher = async function (email, name) {
    return Publisher.findOne({email, name}).select('-__v');
};

exports.getPublisherById = async function (id) {
    return Publisher.findOne({_id:  new mongodb.ObjectID(id)}).select('-__v');
};

exports.getPublisherByEmailandId = async function (email, id) {
    return Publisher.findOne({email, _id:  new mongodb.ObjectID(id)}).select('-__v');
};

exports.createPublisher = async function (data, email) {
    let {name, location, comment} = data;
    const newPublisher = new Publisher({
        name,
        email,
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
