const connection = require('../../db_connection');

class Post {

    static async getAllPosts(){
        const [results, _info] = await connection.promise().query(
            'select username, image, user_id, post_id, title, content, category, likes, upload_date from users inner join posts where id = user_id')
        return results.length ? results : null;
    }

    static async getUserPosts(id){
        const [results, _info] = await connection.promise().query('select * from posts where user_id = ?', [id])
        return results.length ? results : null;
    }

    static async getPaperBin(){
        const [results, _info] = await connection.promise().query('select * from paperbin')
        return results.length ? results : null;
    }

    static async addOne(newPost){
        const {user_id, post_id, title, content, category, likes, upload_date} = newPost;
        const [results, _info] = await connection.promise().query(
            'insert into posts values (?, ?, ?, ?, ?, ?, ?)', [user_id, post_id, title, content, category, likes, upload_date],
            (err, res) => {
                if (err) res.status(500).json({'mensaje': err})
            }
        )
        return results ? results : null;
    }

    static async paperbin(newPost){
        const {user_id, post_id, title, content, category, likes, upload_date} = newPost;
        const [results, _info] = await connection.promise().query(
            'insert into paperbin values (?, ?, ?, ?, ?, ?, ?)', [user_id, post_id, title, content, category, likes, upload_date],
            (err, res) => {
                if (err) res.status(500).json({'mensaje': err})
            }
        )
        return results ? results : null;
    }

    static async update(newPost){
        const {id, user_id, post_id, title, content, category, likes, upload_date} = newPost;
        const [results, _info] = await connection.promise().query(
            'update posts set user_id = ?, post_id = ?, title = ?, content = ?, category = ?, likes = ?, upload_date = ? where post_id = ?', 
            [user_id, post_id, title, content, category, likes, upload_date, id],
            (err, res) => {
                if (err) res.status(500).json({'mensaje': err})
            })
        return results ? results : null
    }

    static async delete(id){
        const [results, _info] = await connection.promise().query(
            'delete from posts where post_id = ?', [id], (req, res) => {
                if (err) res.status(500).json({'mensaje': err})
            }
        )
        return results ? results : null;
    }

    static async deletePaperbinItem(id){
        const [results, _info] = await connection.promise().query(
            'delete from paperbin where post_id = ?', [id], (req, res) => {
                if (err) res.status(500).json({'mensaje': err})
            }
        )
        return results ? results : null;
    }

    static async emptyPaperbin(){
        const [results, _info] = await connection.promise().query('truncate table paperbin')
        return results ? results : null;
    }

}

module.exports = Post;