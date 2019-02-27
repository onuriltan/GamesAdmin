const Publisher = require('../models/Publisher');

exports.getAll = async function () {
    return Publisher.find().select('-__v');
};

exports.getPublishers = async function (email) {
    return Publisher.find({email}).select('-__v');
};

exports.getPublisher = async function (email, title) {
    return Publisher.findOne({email, title}).select('-__v');
};

exports.createPublisher = async function (email, title) {
    const newPublisher = new Publisher({
        title,
        email
    });
    await newPublisher.save();
    return newPublisher;
};

exports.deletePublisher = async function (email, title) {
    await Publisher.deleteOne({title: title, email: email}).select('-__v');
};
