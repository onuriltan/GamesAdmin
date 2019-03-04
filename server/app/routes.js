const authController = require('./controllers/AuthController');
const gameController = require('./controllers/GameController');
const consoleController = require('./controllers/ConsoleController');
const publisherController = require('./controllers/PublisherController');
const userController = require('./controllers/UserController');
const logController = require('./controllers/LogController');

const express = require('express');

module.exports = function(app){
    let apiRoutes = express.Router();
    let authRoutes = express.Router();
    let gameRoutes = express.Router();
    let consoleRoutes = express.Router();
    let publisherRoutes = express.Router();
    let userRoutes = express.Router();
    let logRoutes = express.Router();

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
    gameRoutes.get('/getByName/:name', gameController.getByName);
    gameRoutes.get('/getAllByAdmin', gameController.getAllByAdmin);
    gameRoutes.get('/getAllByUser', gameController.getAllByUser);
    gameRoutes.post('/createByUser', gameController.createByUser);
    gameRoutes.post('/deleteById',  gameController.deleteById);

    // Console Routes
    apiRoutes.use('/console', consoleRoutes);
    consoleRoutes.get('/getAll', consoleController.getAll);
    consoleRoutes.get('/getByName/:name', consoleController.getByName);
    consoleRoutes.get('/getAllByAdmin', consoleController.getAllByAdmin);
    consoleRoutes.get('/getAllByUser', consoleController.getAllByUser);
    consoleRoutes.post('/createByUser', consoleController.createByUser);
    consoleRoutes.post('/deleteById',  consoleController.deleteById);

    // Publisher Routes
    apiRoutes.use('/publisher', publisherRoutes);
    publisherRoutes.get('/getAll', publisherController.getAll);
    publisherRoutes.get('/getByName/:name', publisherController.getByName);
    publisherRoutes.get('/getAllByAdmin', publisherController.getAllByAdmin);
    publisherRoutes.get('/getAllByUser', publisherController.getAllByUser);
    publisherRoutes.post('/deleteById',  publisherController.deleteById);
    publisherRoutes.post('/createByUser', publisherController.createByUser);

    // Log Routes
    apiRoutes.use('/log', logRoutes);
    logRoutes.get('/getLogs/:type', logController.getLogsByType);
    logRoutes.get('/getCrudLogs', logController.getCrudLogs);
    logRoutes.delete('/deleteByCategory/:category', logController.deleteLogsByCategory);

    // Base route
    app.use('/api', apiRoutes);
};
