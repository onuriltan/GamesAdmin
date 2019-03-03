exports.validateCreate = function (req) {
    let { name, dateReleased, publisherId, consoleId } = req.body;
    if (!name) {
        return 'You must enter a game name';
    }
    if (!dateReleased) {
        return 'You must a release date';
    }else if (!dateReleased instanceof Date) {
        return 'You must a release date in date format';
    }
    if (!publisherId) {
        return 'You must enter a publisher';
    }
    if (!consoleId) {
        return 'You must enter a console';
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
