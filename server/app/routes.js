const authController = require('./controllers/AuthController');
const gameController = require('./controllers/GameController');
const userController = require('./controllers/UserController');
const express = require('express');

module.exports = function(app){

    let apiRoutes = express.Router();
    let authRoutes = express.Router();
    let gameRoutes = express.Router();
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

    // Base rout
    app.use('/api', apiRoutes);
};
