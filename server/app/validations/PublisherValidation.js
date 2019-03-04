exports.validateCreate = function (req) {
    let {name, location, comment} = req.body;
    if (!name) {
        return 'You must enter the publisher name';
    }
    if (!location) {
        return 'You must enter the location';
    }
    if (!comment) {
        return 'You must enter the comment';
    }
    return null;
};

exports.validateDelete = function (req) {
    let { id } = req.body;
    if (!id) {
        return 'You must enter an id';
    }
    return null;
};
