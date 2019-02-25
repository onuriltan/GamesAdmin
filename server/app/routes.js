let AuthController = require('./controllers/authController'),
    GameController = require('./controllers/gameController'),
    express = require('express');

module.exports = function(app){

    let apiRoutes = express.Router(),
        authRoutes = express.Router(),
        gameRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', AuthController.register);
    authRoutes.post('/login', AuthController.login);
    authRoutes.get('/protected', function(req, res){
        res.send({ content: 'Success'});
    });

    // Game Routes
    apiRoutes.use('/games', gameRoutes);
    gameRoutes.get('/', GameController.getGames);
    gameRoutes.get('/:game_id', GameController.getGame);
    gameRoutes.post('/', GameController.createGame);
    gameRoutes.delete('/:game_id',  GameController.deleteGame);

    // Setup routes
    app.use('/api', apiRoutes);
};
