const User = require('../models/User');
const jwtHelper = require('../helpers/JwtHelper');

exports.getUsers = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === 'admin') {
        User.find( { role: "user" }, function (err, users) {
            if (err) {
                return next(err);
            }
            else  {
                return res.json(users);
            }
        });
    } else {
        return res.sendStatus(403)
    }
};
exports.deleteUser = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === 'admin') {
        const { email } = req.body;
        User.findOne({email: email}, function (err, existingUser) {
            if (err) {
                return next(err);
            }
            if (existingUser) {
                existingUser.remove();
                return res.status(201).send({message: 'User deleted'});
            }
            return res.status(422).send({error: 'No user with this email'});
        });
    } else {
        return res.sendStatus(403)
    }
};


exports.addUser = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === 'admin') {
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
            return res.status(201).send({message: 'User added'});
        }
    } else {
        return res.sendStatus(403)
    }
};


exports.deactivateUser = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res, next);
    if (authData !== null && authData.role === 'admin') {
        const {email} = req.body;
        const existingUser = await User.findOne({"email": email});
        if (existingUser) {
            existingUser.active = false;
            existingUser.save((err, updatedUser) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({error: 'Error occured'})
                } else {
                    console.log(updatedUser.name + " deactivated")
                    return res.status(201).send({message: 'User deactivated'})
                }
            });
        } else {
            return res.status(422).send({error: 'User not found'})
        }
    } else {
        return res.sendStatus(403)
    }
};
