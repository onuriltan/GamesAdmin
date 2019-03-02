exports.validateAddUser = function (req) {
    const {email, password, role, comment} = req.body;
    if (!email) {
        return 'You must enter an email address';
    } else if (!validEmail(email)) {
        return 'Email is not valid';
    }
    if (!password) {
        return 'You must enter a password';
    } else if (password.length < 6) {
        return 'New password length should be 6';
    }
    if (!role) {
        return 'You must enter a role';
    } else if (role !== 'user' && role !== 'admin') {
        return 'Wrong user role';
    }
    if (!comment) {
        return 'You must enter a comment';
    }
    return null;
};

exports.validateDeleteUser = function (req) {
    const {email} = req.body;
    if (!email) {
        return 'You must enter an email address';
    } else if (!validEmail(email)) {
        return 'Email is not valid';
    }
    return null;
};

exports.validateUpdatePassword = function (req) {
    const {oldPassword, newPassword, repeatPassword} = req.body;
    if (!oldPassword) {
        return 'You must enter the old password';
    }
    if (!newPassword) {
        return  'You must enter the new password';
    } else if (newPassword.length < 6) {
        return  'New password length should be 6';
    }
    if (!repeatPassword) {
        return'You must enter the repeat password';
    } else if (repeatPassword.length < 6) {
        return 'Repeat password length should be 6';
    }
    if (newPassword !== repeatPassword) {
        return 'Passwords does not match';
    }
    return null;
};

exports.validateUpdateEmail = function (req) {
    const {newEmail} = req.body;
    if (!newEmail) {
        return  'You must enter an email address';
    } else if (!validEmail(newEmail)) {
        return 'Email is not valid';
    }
    return null;
};


exports.validateUpdateUser = function (req, res) {
    const {oldEmail, newEmail, newPassword} = req.body;
    if (!oldEmail) {
        return res.status(400).send({error: 'You must enter the old email'});
    } else if (!validEmail(oldEmail)) {
        return res.status(400).send({error: 'Old email is not valid'});
    }
    if (newEmail && !validEmail(newEmail)) {
        return res.status(400).send({error: 'You must enter a valid email'});
    }
    if (newPassword && newPassword.length < 6) {
        return res.status(400).send({error: 'New password length should be at least 6'});
    }
    return null;
};

exports.validateDeactivateUser = function (req, res) {
    const {email} = req.body;
    if (!email) {
        return res.status(400).send({error: 'You must enter the email'});
    } else if (!validEmail(email)) {
        return res.status(400).send({error: 'Email is not valid'});
    }
    return null;
};

function validEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}
