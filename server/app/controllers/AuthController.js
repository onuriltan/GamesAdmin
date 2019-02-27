const jwt = require('jsonwebtoken');
const userDb = require('../db/UserDb')
const bcrypt = require('bcrypt');

exports.login = async function (req, res, next) {
    const {email, password} = req.body;
    const existingUser = await userDb.getUser(email);
    if (existingUser) {
        if(!existingUser.active) {
            return res.status(403).send({error: 'User is not active'});
        }
        let isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        console.log(isPasswordCorrect)
        if (isPasswordCorrect) {
            let userInfo = setUserInfo(existingUser);
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


function generateToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 10080
    });
}

function setUserInfo(request) {
    return {
        email: request.email,
        role: request.role
    };
}

