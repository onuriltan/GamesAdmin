const Publisher = require('../models/Publisher');
const mongodb = require('mongodb');


exports.getAll = async function () {
    return Publisher.find().select('-__v').lean().exec();
};

exports.getById = async function (id) {
    return Publisher.findOne({_id: new mongodb.ObjectID(id)}).select('-__v -_id -userId -createdAt -updatedAt').lean().exec();
};

exports.getByName = async function (name) {
    let regex = new RegExp(`${name}`, "i");
    return Publisher.find({"name": {$regex: regex}}).select('-__v -_id -userId -createdAt -updatedAt').lean().exec();
};

exports.findById = async function (id) {
    return Publisher.findOne({_id: new mongodb.ObjectID(id)}).select('-__v');
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

exports.deletePublisherById = async function (id) {
    return await Publisher.deleteOne({_id: new mongodb.ObjectID(id)}).select('-__v').lean().exec();
};
