const jwtHelper = require('../helpers/JwtHelper');
const userDb = require('../repositories/UserDb')

exports.getUsers = async function (req, res, next) {
    const authData = await jwtHelper.decodeToken(req, res);
    if (authData !== null && authData.role === 'admin') {
        let users = await userDb.getUsersByRole('user');
        return res.json(users);
    } else {
        return res.sendStatus(403)
    }
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
        const {email, password} = req.body;
        if (!email) {
            return res.status(422).send({error: 'You must enter an email address'});
        }
        if (!password) {
            return res.status(422).send({error: 'You must enter a password'});
        }
        const existingUser = await userDb.getUser(email);
        if (existingUser) {
            return res.status(422).send({error: 'That email address is already in use'})
        } else {
            await userDb.addUser(email, password, 'user');
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
