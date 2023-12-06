const Router = require('express');
const bodyParser = require('body-parser');
const PostController = require('./Controller');
const isAuth = require('../middlewares/Auth');

const postRouter = Router();

postRouter.get('/', bodyParser.json(), PostController.getAll)
postRouter.post('/post', bodyParser.json(), isAuth, PostController.addOne)
//postRouter.update('/update', bodyParser.json())
postRouter.delete('/delete', isAuth, PostController.deleteOne)

module.exports = postRouter;