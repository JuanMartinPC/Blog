const Post = require('./Model');

class PostController {
    static getUserPosts = async (req, res) => {
        const id = req.query.id;
        const allPosts = await Post.getUserPosts(id)
        allPosts
            ? res.status(200).json(allPosts)
            : res.status(404).json({'mensaje': 'Nada por aquí...'})
    }

    static getAllPosts = async (req, res) => {
        const allPosts = await Post.getAllPosts()
        allPosts
            ? res.status(200).json(allPosts)
            : res.status(404).json({'mensaje': 'Nada por aquí...'})
    }

    static getPaperBin = async (req, res) => {
        const allPosts = await Post.getPaperBin()
        allPosts
            ? res.status(200).json(allPosts)
            : res.status(404).json({'mensaje': 'Nada por aquí...'})
    }

    static addOne = async (req, res) => {
        const {user_id, post_id, title, content, category} = req.body
        const date = new Date()
        const now = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }
        const newPost = {
            user_id,
            post_id,
            title,
            content,
            category,
            likes: 0,
            upload_date: `${now.day}-${now.month}-${now.year}`
        }
        const post = await Post.addOne(newPost);
        post ? res.status(200).json({'mensaje': 'Publicación exitosa!'}) : res.status(500).json({'mensaje': 'Algo salió mal. :c'})

    }

    static sendToPaperBin = async (req, res) => {
        const {user_id, post_id, title, content, category} = req.body
        const date = new Date()
        const now = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }
        const newPost = {
            user_id,
            post_id,
            title,
            content,
            category,
            likes: 0,
            upload_date: `${now.day}-${now.month}-${now.year}`
        }
        await Post.delete(post_id);
        const post = await Post.paperbin(newPost);
        post ? res.status(200).json({'mensaje': 'Publicación enviada a la papelera.'}) : res.status(500).json({'mensaje': 'Algo salió mal. :c'})
    }

    static RestoreItem = async (req, res) => {
        const {user_id, post_id, title, content, category} = req.body
        const date = new Date()
        const now = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }
        const newPost = {
            user_id,
            post_id,
            title,
            content,
            category,
            likes: 0,
            upload_date: `${now.day}-${now.month}-${now.year}`
        }
        await Post.deletePaperbinItem(post_id);
        const post = await Post.addOne(newPost);
        post ? res.status(200).json({'mensaje': 'Publicación enviada a la papelera.'}) : res.status(500).json({'mensaje': 'Algo salió mal. :c'})
    }

    static updateOne = async (req, res) => {
        const id = req.query.id;
        const {user_id, post_id, title, content, category} = req.body;
        const date = new Date()
        const now = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }
        const newPost = {
            id,
            user_id,
            post_id,
            title,
            content,
            category,
            likes: 0,
            upload_date: `${now.day}-${now.month}-${now.year}`
        }
        const updatePost = await Post.update(newPost);
        updatePost ? res.status(200).json({'mensaje': 'Publicación editada!'}) : res.status(500).json({'mensaje': 'Algo salió mal. :c'})

    }

    static deleteOne = async (req, res) => {
        const id = req.query.id
        const del = await Post.delete(id)
        del ? res.status(200).json({'mensaje': 'Publicacion eliminada'}) : res.status(500).json({'mensaje': 'Algo salió mal. :c'})
    }

    static deletePaperbinItem = async (req, res) => {
        const id = req.query.id
        const del = await Post.deletePaperbinItem(id)
        del ? res.status(200).json({'mensaje': 'Publicacion eliminada'}) : res.status(500).json({'mensaje': 'Algo salió mal. :c'})
    }

    static emptyPaperbin = async (req, res) => {
        const emptyppb = await Post.emptyPaperbin()
        emptyppb ? res.status(200).json({'mensaje': 'Se ha vaciado la papelera'}) : res.status(500).json({'mensaje': 'Algo salió mal. :c'})
    }
}

module.exports = PostController;