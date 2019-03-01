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

    // Game Routes
    apiRoutes.use('/game', gameRoutes);
    gameRoutes.get('/getAll', gameController.getAll);
    gameRoutes.get('/getGames', gameController.getGames);
    gameRoutes.get('/:gamename', gameController.getGame);
    gameRoutes.post('/', gameController.createGame);
    gameRoutes.delete('/:gamename',  gameController.deleteGame);
    gameRoutes.post('/deleteById',  gameController.deleteGameById);

    // Console Routes
    apiRoutes.use('/console', consoleRoutes);
    consoleRoutes.get('/getAll', consoleController.getAll);
    consoleRoutes.get('/getConsoles', consoleController.getConsoles);
    consoleRoutes.get('/:consolename', consoleController.getConsole);
    consoleRoutes.post('/', consoleController.createConsole);
    consoleRoutes.delete('/:consolename',  consoleController.deleteConsole);
    consoleRoutes.post('/deleteById',  consoleController.deleteConsoleById);

    // Publisher Routes
    apiRoutes.use('/publisher', publisherRoutes);
    publisherRoutes.get('/getAll', publisherController.getAll);
    publisherRoutes.get('/getPublishers', publisherController.getPublishers);
    publisherRoutes.get('/:publishername', publisherController.getPublisher);
    publisherRoutes.post('/', publisherController.createPublisher);
    publisherRoutes.delete('/:publishername',  publisherController.deletePublisher);
    publisherRoutes.post('/deleteById',  publisherController.deletePublisherById);

    // Log Routes
    apiRoutes.use('/log', logRoutes);
    logRoutes.get('/getLogs/:type', logController.getLogsByType);

    // Base route
    app.use('/api', apiRoutes);
};
