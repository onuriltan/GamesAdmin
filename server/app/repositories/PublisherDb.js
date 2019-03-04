const Publisher = require('../models/Publisher');
const mongodb = require('mongodb');

exports.getAllPublic = async function () {
    return Publisher.find().select('-__v -_id -userId -createdAt -updatedAt').lean().exec();
};

exports.getAll = async function () {
    return Publisher.find().select('-__v').lean().exec();
};

exports.getById = async function (id) {
    return Publisher.findOne({_id:  new mongodb.ObjectID(id)}).select('-__v -_id -userId -createdAt -updatedAt').lean().exec();
};
exports.getPublishersByUser = async function (userId) {
    return Publisher.find({userId}).select('-__v').lean().exec();
};

exports.getByName = async function (name) {
    let regex = new RegExp(`${name}`, "i");
    return Publisher.find({"name": {$regex: regex}}).select('-__v -_id -userId -createdAt -updatedAt').lean().exec();
};

exports.findById = async function (id) {
    return Publisher.findOne({_id:  new mongodb.ObjectID(id)}).select('-__v');
};

exports.getPublisherByUserandId = async function (userId, id) {
    return Publisher.findOne({userId, _id:  new mongodb.ObjectID(id)}).select('-__v').lean().exec();
};

exports.getByExactName = async function (name) {
    return Publisher.findOne({name});
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
    await Publisher.deleteOne({name: name, email: email}).select('-__v').lean().exec();
};

exports.deletePublisherById = async function (id) {
    return await Publisher.deleteOne({_id:  new mongodb.ObjectID(id)}).select('-__v').lean().exec();
};
