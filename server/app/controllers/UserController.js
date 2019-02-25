const User = require('../models/User');

exports.deleteUser = function (req, res, next) {
    let email = req.body.email;

    User.findOne({email: email}, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            existingUser.remove()
            return res.status(201).send({message: 'User deleted'});
        }
        return res.status(422).send({error: 'No user with this email'});

    });
};


exports.addUser = async function (req, res, next) {
    const {email, password} = req.body;
    if (!email) {
        return res.status(422).send({error: 'You must enter an email address'});
    }
    if (!password) {
        return res.status(422).send({error: 'You must enter a password'});
    }
    const existingUser = await User.findOne({"email": email});
    if (existingUser) {
        return res.status(422).send({error: 'That email address is already in use'})
    } else {
        let user = new User({
            email: email,
            password: password,
            role: 'user'
        });
        user.save();
        return res.status(201).send({error: 'User added'});
    }
};


exports.deactivateUser = async function (req, res, next) {
    const {email } = req.body;

    const existingUser = await User.findOne({"email": email});
    if (existingUser) {
        existingUser.active = false;
        existingUser.save((err, updatedUser) => {
            if (err) {
                console.log(err);
                return res.status(500).send({error: 'Error occured'})
            }
            else {
                console.log(updatedUser.name + " deactivated")
                return res.status(201).send({message: 'User deactivated'})
            }
        });
    } else {
        return res.status(422).send({error: 'User not found'})
    }
};
