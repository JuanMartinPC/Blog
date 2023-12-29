const Router = require('express');
const bodyParser = require('body-parser');
const PostController = require('./Controller');
const isAuth = require('../middlewares/Auth');
const upload  = require('../middlewares/handleUploads');

const postRouter = Router();

postRouter.get('/', bodyParser.json(), PostController.getUserPosts)
postRouter.get('/feed', bodyParser.json(), PostController.getAllPosts)
postRouter.get('/getPaperbin', bodyParser.json(), PostController.getPaperBin)
postRouter.post('/post', bodyParser.json(), upload.single('file'), PostController.addOne)
postRouter.post('/paperbin', bodyParser.json(), PostController.sendToPaperBin)
postRouter.post('/restore', bodyParser.json(), PostController.RestoreItem)
postRouter.put('/update', bodyParser.json(), PostController.updateOne)
postRouter.delete('/delete', PostController.deleteOne)
postRouter.delete('/deletePaperbinItem', PostController.deletePaperbinItem)
postRouter.delete('/emptyPaperbin', PostController.emptyPaperbin)

module.exports = postRouter;