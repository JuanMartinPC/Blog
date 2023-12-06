const Router = require('express');
const bodyParser = require('body-parser');
const UsersController = require('./Controller');

const userRouter = Router();

userRouter.get('/', UsersController.getAll)
userRouter.post('/login', bodyParser.json(), UsersController.Login)
userRouter.post('/register', bodyParser.json(), UsersController.Register)

module.exports = userRouter;