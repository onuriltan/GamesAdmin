let AuthenticationController = require('./controllers/authentication'),
    TodoController = require('./controllers/todos'),
    express = require('express');

module.exports = function(app){

    let apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', AuthenticationController.login);
    authRoutes.get('/protected', function(req, res){
        res.send({ content: 'Success'});
    });

    // Todo Routes
    apiRoutes.use('/todos', todoRoutes);
    todoRoutes.get('/', TodoController.getTodos);
    todoRoutes.post('/', TodoController.createTodo);
    todoRoutes.delete('/:todo_id',  TodoController.deleteTodo);

    // Set up routes
    app.use('/api', apiRoutes);
};
