exports.validateCreate = function (req) {
    let {name, dateReleased, publisherId, consoleId} = req.body;
    if (!name) {
        return 'You must enter the game name';
    }
    if (!dateReleased) {
        return 'You must enter the release date';
    } else if (!dateReleased instanceof Date) {
        return 'You must enter the release date in date format';
    }
    if (!publisherId) {
        return 'You must enter the publisher';
    }
    if (!consoleId) {
        return 'You must enter the console';
    }
    return null;
};

exports.validateDelete = function (req) {
    let {id} = req.body;
    if (!id) {
        return 'You must enter an id';
    }
    return null;
};

exports.validateUpdate = function (req) {
    let {oldName, name} = req.body;
    if (!oldName) {
        return 'You must enter the old name of the item';
    }
    if (!name) {
        return 'You must enter the new name of the item';
    }
    return null;
};
