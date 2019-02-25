const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

function generateToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 10080
    });
}

function setUserInfo(request, _id) {
    return {
        _id: _id,
        email: request.email,
        role: request.role
    };
}

exports.login = async function (req, res, next) {
    const {email, password} = req.body;

    const existingUser = await User.findOne({"email": email});
    if (existingUser) {
        let isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (isPasswordCorrect) {
            let userInfo = setUserInfo(existingUser, existingUser._id);
            return res.status(200).json({
                token: generateToken(userInfo),
                user: userInfo
            });
        } else {
            return res.status(422).send({error: 'Username or password is wrong'});
        }
    } else {
        return res.status(422).send({error: 'Username or password is wrong'});
    }
};

exports.register = function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    if (!email) {
        return res.status(422).send({error: 'You must enter an email address'});
    }

    if (!password) {
        return res.status(422).send({error: 'You must enter a password'});
    }

    User.findOne({email: email}, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.status(422).send({error: 'That email address is already in use'});
        }
        let user = new User({
            email: email,
            password: password,
            role: 'user'
        });

        user.save(function (err, user) {
            if (err) {
                return next(err);
            }
            let userInfo = setUserInfo(user, user._id);
            res.status(201).json({
                token: generateToken(userInfo),
                user: userInfo
            })
        });
    });
};


exports.roleAuthorization = function (roles) {
    return function (req, res, next) {
        let user = req.user;
        User.findById(user._id, function (err, foundUser) {
            if (err) {
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
            if (roles.indexOf(foundUser.role) > -1) {
                return next();
            }
            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');
        });
    }
};
