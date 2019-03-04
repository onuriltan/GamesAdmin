exports.validateCreate = function (req) {
    let {name, cpu, ram, year, comment} = req.body;
    if (!name) {
        return 'You must enter the console name';
    }
    if (!cpu) {
        return 'You must enter the CPU';
    }
    if (!ram) {
        return 'You must enter the RAM';
    }
    if (!year) {
        return 'You must enter the year';
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
