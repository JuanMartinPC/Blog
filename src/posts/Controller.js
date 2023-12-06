const Post = require('./Model');

class PostController {
    static getAll = async (req, res) => {
        const allPosts = await Post.getAll()
        allPosts
            ? res.status(200).json(allPosts)
            : res.status(404).json({'mensaje': 'Nada por aquí...'})
    }

    static addOne = async (req, res) => {
        const {user_id, post_id, content} = req.body
        const date = new Date()
        const now = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }
        const newPost = {
            user_id,
            post_id,
            content,
            likes: 0,
            upload_date: `${now.day}-${now.month}-${now.year}`
        }
        const post = await Post.addOne(newPost);
        post ? res.status(200).json({'mensaje': 'Publicación exitosa!'}) : res.status(500).json({'mensaje': 'Algo salió mal. :c'})

    }

    static deleteOne = async (req, res) => {
        const id = req.query.id
        const del = await Post.delete(id)
        del ? res.status(200).json({'mensaje': 'Publicacion eliminada'}) : res.status(500).json({'mensaje': 'Algo salió mal. :c'})
    }
}

module.exports = PostController;