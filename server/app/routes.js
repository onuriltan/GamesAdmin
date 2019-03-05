const authController = require('./controllers/AuthController');
const gameController = require('./controllers/GameController');
const consoleController = require('./controllers/ConsoleController');
const publisherController = require('./controllers/PublisherController');
const userController = require('./controllers/UserController');
const logController = require('./controllers/LogController');

const express = require('express');

module.exports = function (app) {
    let apiRoutes = express.Router();
    let authRoutes = express.Router();
    let gameRoutes = express.Router();
    let consoleRoutes = express.Router();
    let publisherRoutes = express.Router();
    let userRoutes = express.Router();
    let logRoutes = express.Router();
    let v1Routes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/login', authController.login);

    // User Routes
    apiRoutes.use('/user', userRoutes);
    userRoutes.get('/getUsers', userController.getUsers);
    userRoutes.post('/', userController.addUser);
    userRoutes.post('/delete', userController.deleteUser);
    userRoutes.put('/deactivate', userController.deactivateUser);
    userRoutes.post('/update', userController.updateUser);
    userRoutes.post('/updateEmail', userController.updateEmail);
    userRoutes.post('/updatePassword', userController.updatePassword);

    // Game Routes
    apiRoutes.use('/game', gameRoutes);
    gameRoutes.get('/getAll', gameController.getAll);
    gameRoutes.post('/createByUser', gameController.createByUser);
    gameRoutes.post('/updateByAdmin', gameController.updateByAdmin);
    gameRoutes.post('/updateByUser', gameController.updateByUser);
    gameRoutes.post('/deleteById', gameController.deleteById);

    // Console Routes
    apiRoutes.use('/console', consoleRoutes);
    consoleRoutes.get('/getAll', consoleController.getAll);
    consoleRoutes.post('/createByUser', consoleController.createByUser);
    consoleRoutes.post('/updateByAdmin', consoleController.updateByAdmin);
    consoleRoutes.post('/updateByUser', consoleController.updateByUser);
    consoleRoutes.post('/deleteById', consoleController.deleteById);

    // Publisher Routes
    apiRoutes.use('/publisher', publisherRoutes);
    publisherRoutes.get('/getAll', publisherController.getAll);
    publisherRoutes.post('/deleteById', publisherController.deleteById);
    publisherRoutes.post('/updateByAdmin', publisherController.updateByAdmin);
    publisherRoutes.post('/updateByUser', publisherController.updateByUser);
    publisherRoutes.post('/createByUser', publisherController.createByUser);

    // Log Routes
    apiRoutes.use('/log', logRoutes);
    logRoutes.get('/getLogs/:type', logController.getLogsByType);
    logRoutes.get('/getCrudLogs', logController.getCrudLogs);
    logRoutes.delete('/deleteByCategory/:category', logController.deleteLogsByCategory);


    // v1 Routes
    apiRoutes.use('/v1', v1Routes);
    v1Routes.get('/games/getByName/:name', gameController.getByName);
    v1Routes.get('/consoles/getByName/:name', consoleController.getByName);
    v1Routes.get('/publishers/getByName/:name', publisherController.getByName);

    // Base route
    app.use('/api', apiRoutes);
};
