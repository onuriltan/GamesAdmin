const authController = require('./controllers/AuthController');
const gameController = require('./controllers/GameController');
const consoleController = require('./controllers/ConsoleController');
const publisherController = require('./controllers/PublisherController');
const userController = require('./controllers/UserController');

const express = require('express');

module.exports = function(app){
    let apiRoutes = express.Router();
    let authRoutes = express.Router();
    let gameRoutes = express.Router();
    let consoleRoutes = express.Router();
    let publisherRoutes = express.Router();
    let userRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', authController.register);
    authRoutes.post('/login', authController.login);

    // User Routes
    apiRoutes.use('/user', userRoutes);
    userRoutes.post('/', userController.addUser);
    userRoutes.delete('/', userController.deleteUser);
    userRoutes.put('/deactivate', userController.deactivateUser);

    // Game Routes
    apiRoutes.use('/game', gameRoutes);
    gameRoutes.get('/getGames', gameController.getGames);
    gameRoutes.get('/:game_id', gameController.getGame);
    gameRoutes.post('/', gameController.createGame);
    gameRoutes.delete('/:game_id',  gameController.deleteGame);

    // Console Routes
    apiRoutes.use('/console', consoleRoutes);
    consoleRoutes.get('/getConsoles', consoleController.getConsoles);
    consoleRoutes.get('/:console_id', consoleController.getConsole);
    consoleRoutes.post('/', consoleController.createConsole);
    consoleRoutes.delete('/:console_id',  consoleController.deleteConsole);

    // Publisher Routes
    apiRoutes.use('/publisher', publisherRoutes);
    publisherRoutes.get('/getPublishers', publisherController.getPublishers);
    publisherRoutes.get('/:publisher_id', publisherController.getPublisher);
    publisherRoutes.post('/', publisherController.createPublisher);
    publisherRoutes.delete('/:publisher_id',  publisherController.deletePublisher);

    // Base route
    app.use('/api', apiRoutes);
};
