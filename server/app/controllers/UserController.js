const jwtHelper = require('../helpers/JwtHelper');
const logHelper = require('../helpers/LogHelper');
const userDb = require('../repositories/UserDb');

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
            return res.status(422).send({error: 'No user with this email'});
        }
    } else {
        return res.sendStatus(403)
    }
};


exports.addUser = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === 'admin') {
        const {email, password, role} = req.body;
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
            await userDb.addUser(email, password, role);
            return res.status(204).send({message: 'User added'});
        }
    } else {
        return res.sendStatus(403)
    }
};

exports.updateUser = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if(authData !== null && authData.role === "user") {
        await logHelper.createLog(req, authData.email, "user");
        const {newEmail, newPassword} = req.body;
        const existingUser = await userDb.getUser(authData.email);
        if(newEmail) existingUser.email = newEmail;
        if(newPassword) existingUser.password = newPassword;
        existingUser.save();
        return res.status(201).send({message: 'User updated'});
    }
    if (authData !== null && authData.role === 'admin') {
        await logHelper.createLog(req, authData.email, "admin");
        const {oldEmail, newEmail, newPassword} = req.body;
        if(!oldEmail) {
            return res.status(422).send({error: 'You must enter the oldEmail'});
        }
        const existingUser = await userDb.getUser(oldEmail);
        if(!existingUser) {
            return res.status(404).send({error: 'User not found'});
        }
        if(newEmail) existingUser.email = newEmail;
        if(newPassword) existingUser.password = newPassword;
        existingUser.save();
        return res.status(201).send({message: 'User updated'});
    } else {
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
            return res.status(422).send({error: 'User not found'})
        }
    } else {
        return res.sendStatus(403)
    }
};


