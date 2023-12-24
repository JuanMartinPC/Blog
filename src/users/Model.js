const connection = require('../../db_connection');

class Users {
    static Login = async (email) => {
        const [user, _info] = await connection.promise().query('select * from users where email = ?',
        [email],
        (err, results) => {
            if (err) return console.log(err);
        }
        )
        return user.length ? user : null
    }

    static Register = async (user) => {
        const {username, email, pass, image} = user;
        const results = await connection.promise().query('insert into users (username, email, pass, image) values (?, ?, ?, ?)',
        [username, email, pass, image],
        (err, results) => {
            if (err) return res.json({'mensaje': err})
            /* console.log(results);
            res.json({'mensaje': 'Usuario registrado.'}) */
        })
        return results.length ? results : null
    }

    static async getAll(id){
        if (!id){
            const [results, _info] = await connection.promise().query('select * from users')
            return results.length ? results : null
        } else {
            const [results, _info] = await connection.promise().query('select * from users where id = ?', [id])
            return results.length ? results : null
        }
    }
}

module.exports = Users;