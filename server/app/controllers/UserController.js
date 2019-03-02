const jwtHelper = require('../helpers/JwtHelper');
const logHelper = require('../helpers/LogHelper');
const userDb = require('../repositories/UserDb');
const bcrypt = require('bcrypt');

exports.getUsers = async function (req, res, next) {
    let users = await userDb.getUsersByRole('user');
    return res.json(users);
};
exports.deleteUser = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === 'admin') {
        const { email } = req.body;
        let existingUser = await userDb.getUser(email);
        if (existingUser) {
            await userDb.deleteUser(email);
            return res.status(201).send({message: 'User deleted'});
        }
        else {
            return res.status(400).send({error: 'No user with this email'});
        }
    } else {
        return res.sendStatus(403)
    }
};


exports.addUser = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === 'admin') {
        const {email, password, role, comment} = req.body;
        if (!email) {
            return res.status(400).send({error: 'You must enter an email address'});
        }
        if (!password) {
            return res.status(400).send({error: 'You must enter a password'});
        }
        if (!role) {
            return res.status(400).send({error: 'You must enter a role'});
        }
        const existingUser = await userDb.getUser(email);
        if (existingUser) {
            return res.status(405).send({error: 'That email address is already in use'})
        } else {
            await userDb.addUser(email, password, role, comment);
            return res.status(200).send({message: 'User added'});
        }
    } else {
        return res.sendStatus(403)
    }
};

exports.updatePassword = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if(authData !== null && authData.role === "user") {
        await logHelper.createLog(req, authData.email, "user");
        const {oldPassword, newPassword, repeatPassword} = req.body;
        const existingUser = await userDb.getUser(authData.email);
        let isPasswordCorrect = bcrypt.compareSync(oldPassword, existingUser.password);
        if(isPasswordCorrect) {
            if(newPassword === repeatPassword) {
                if(newPassword.length < 6 ) {
                    return res.status(400).send({message: 'Password length should be at least 6'});
                }
                existingUser.password = newPassword;
                existingUser.save()
                return res.status(200).send({message: 'Password updated'});
            }else {
                return res.status(400).send({error: 'Passwords do not match'});
            }
        }else {
            return res.status(403).send({error: 'Old password is not correct'});
        }
    }
    else {
        return res.sendStatus(403);
    }
};

exports.updateEmail = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if(authData !== null && authData.role === "user") {
        await logHelper.createLog(req, authData.email, "user");
        const { newEmail } = req.body;
        const existingUser = await userDb.getUser(authData.email);
        if(existingUser) {
            existingUser.email = newEmail;
            existingUser.save();
            return res.status(200).send({message: 'Email updated'});
        }else {
            return res.status(404).send({message: 'User not found'});
        }
    } else {
        return res.sendStatus(403);
    }
};

exports.updateUser = async function(req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === 'admin') {
        await logHelper.createLog(req, authData.email, "admin");
        const {oldEmail, newEmail, newPassword} = req.body;
        if(!oldEmail) {
            return res.status(400).send({error: 'You must enter the old email'});
        }
        const existingUser = await userDb.getUser(oldEmail);
        if(!existingUser) {
            return res.status(404).send({error: 'User not found'});
        }
        if(newEmail) existingUser.email = newEmail;
        if(newPassword) existingUser.password = newPassword;
        existingUser.save();
        return res.status(200).send({message: 'User updated'});
    }
    else {
        return res.sendStatus(403);
    }
};


exports.deactivateUser = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res, next);
    if (authData !== null && authData.role === 'admin') {
        const {email} = req.body;
        const existingUser = await userDb.getUser(email);
        if (existingUser) {
            let deactivatedUser = await userDb.deactivateUser(existingUser);
            console.log(deactivatedUser.name + " deactivated")
            return res.status(201).send({message: 'User deactivated'})
        } else {
            return res.status(400).send({error: 'User not found'})
        }
    } else {
        return res.sendStatus(403)
    }
};


