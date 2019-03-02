exports.validateAddUser = function (req, res) {
    const {email, password, role, comment} = req.body;
    if (!email) {
        return res.status(400).send({error: 'You must enter an email address'});
    }else if(!validEmail(email)) {
        return res.status(400).send({error: 'Email is not valid'});
    }
    if (!password) {
        return res.status(400).send({error: 'You must enter a password'});
    }else if(password < 6) {
        return res.status(400).send({error: 'New password length should be 6'});
    }
    console.log(!role)
    if (!role) {
        return res.status(400).send({error: 'You must enter a role'});
    }
    if(role !== 'user' && role !== 'admin') {
        return res.status(400).send({error: 'Wrong user role'});
    }
    if (!comment) {
        return res.status(400).send({error: 'You must enter a comment'});
    }
};

exports.validateDeleteUser = function (req, res) {
    const {email} = req.body;
    if (!email) {
        return res.status(400).send({error: 'You must enter an email address'});
    }else if(!validEmail(email)) {
        return res.status(400).send({error: 'Email is not valid'});
    }
};

exports.validateUpdatePassword = function (req, res) {
    const {oldPassword, newPassword, repeatPassword} = req.body;
    if (!oldPassword) {
        return res.status(400).send({error: 'You must enter an email address'});
    }
    if (!newPassword) {
        return res.status(400).send({error: 'You must enter an email address'});
    }else if(newPassword < 6) {
        return res.status(400).send({error: 'New password length should be 6'});
    }
    if (!repeatPassword) {
        return res.status(400).send({error: 'You must enter an email address'});
    }else if(repeatPassword < 6) {
        return res.status(400).send({error: 'Repeat password length should be 6'});
    }
    if(newPassword !==  repeatPassword) {
        return res.status(400).send({error: 'Passwords does not match'});
    }
};

exports.validateUpdateEmail = function(req, res) {
    const {newEmail} = req.body;
    if (!newEmail) {
        return res.status(400).send({error: 'You must enter an email address'});
    }else if(!validEmail(newEmail)) {
        return res.status(400).send({error: 'Email is not valid'});
    }
};


exports.validateUpdateUser = function(req, res) {
    const {oldEmail, newEmail, newPassword} = req.body;
    if (!oldEmail) {
        return res.status(400).send({error: 'You must enter the old email'});
    }else if(!validEmail(oldEmail)) {
        return res.status(400).send({error: 'Old email is not valid'});
    }
    if (newEmail && !validEmail(newEmail)) {
        return res.status(400).send({error: 'You must enter the new email'});
    }

    if (newPassword && newPassword.length < 6) {
        return res.status(400).send({error: 'New password length should be at least 6'});
    }
};

exports.validateDeactivateUser = function(req, res) {
    const {email } = req.body;
    if (!email) {
        return res.status(400).send({error: 'You must enter the email'});
    }else if(!validEmail(email)) {
        return res.status(400).send({error: 'Email is not valid'});
    }
};

function validEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}
