exports.validateCreate = function (req) {
    let {name, cpu, ram, year, comment} = req.body;
    if (!name) {
        return 'You must enter a console name';
    }
    if (!cpu) {
        return 'You must cpu';
    }
    if (!ram) {
        return 'You must enter  ram';
    }
    if (!year) {
        return 'You must enter a year';
    }
    if (!comment) {
        return 'You must enter a comment';
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
