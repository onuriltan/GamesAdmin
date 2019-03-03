const jwtHelper = require('../helpers/JwtHelper');
const logHelper = require('../helpers/LogHelper');
const userDb = require('../repositories/UserDb');
const bcrypt = require('bcrypt');
const userValidation = require('../validations/UserValidation');

exports.getUsers = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === 'admin') {
        let users = await userDb.getAll();
        return res.json(users);
    } else {
        return res.sendStatus(403)
    }
};
exports.deleteUser = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === 'admin') {
        let error = await userValidation.validateDeleteUser(req);
        if(error) {
            return res.status(400).send({error})
        }
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
        let error = userValidation.validateAddUser(req);
        if(error) {
            return res.status(400).send({error})
        }
        const existingUser = await userDb.getUser(email);
        if (existingUser) {
            return res.status(403).send({error: 'That email address is already in use'})
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
        let error =  userValidation.validateUpdatePassword(req);
        if(error) {
            return res.status(400).send({error})
        }
        const {oldPassword, newPassword} = req.body;
        const existingUser = await userDb.getUser(authData.email);
        let isPasswordCorrect = bcrypt.compareSync(oldPassword, existingUser.password);
        if(isPasswordCorrect) {
                existingUser.password = newPassword;
                existingUser.save()
                return res.status(200).send({message: 'Password updated'});
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
        let error = userValidation.validateUpdateEmail(req);
        if(error) {
            return res.status(400).send({error})
        }
        const { newEmail } = req.body;
        const existingEmail = await userDb.getUser(newEmail);
        if(existingEmail) {
            return res.status(403).send({message: 'This email is already registered'});
        }
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
        let error =  userValidation.validateUpdateUser(req, res);
        if(error) {
            return res.status(400).send({error})
        }
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
        await logHelper.createLog(req, authData.email, 'admin');
        let error =  userValidation.validateDeactivateUser(req, res);
        if(error) {
            return res.status(400).send({error})
        }
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


