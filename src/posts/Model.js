const connection = require('../../db_connection');

class Post {
    static async getAll(){
        const [results, _info] = await connection.promise().query('select * from posts')
        return results.length ? results : null;
    }

    static async addOne(newPost){
        const {user_id, post_id, content, likes, upload_date} = newPost;
        const [results, _info] = await connection.promise().query(
            'insert into posts values (?, ?, ?, ?, ?)', [user_id, post_id, content, likes, upload_date],
            (err, res) => {
                if (err) res.status(500).json({'mensaje': err})
            }
        )
        return results ? results : null;
    }

    static async delete(id){
        const [results, _info] = await connection.promise().query(
            'delete from posts where post_id = ?', [id], (req, res) => {
                if (err) res.status(500).json({'mensaje': err})
            }
        )
        return results ? results : null;
    }
}

module.exports = Post;