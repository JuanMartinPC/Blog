const Users = require('../users/Model');
const {hash, compare} = require('bcrypt');
const { tokenSign } = require('../utils/handleJWT');

class UsersController {
    static Login = async (req, res) => {
        const {email, pass} = req.body;
        const isUser = await Users.Login(email)
        if (!isUser) return res.status(401).json({'mensaje': 'La dirección de correo ingresada es incorrecta.'})
        const checkPass = await compare(pass, isUser[0].pass)
        if (!checkPass){
            return res.status(401).json({'mensaje': 'La contraseña ingresada es incorrecta.'})
        }
        else {
            const tokenPayload = {
                email: email,
                pass: pass
            }
            const jwt = tokenSign(tokenPayload, 60 * 60 * 24)            
            res.status(200).send([jwt, isUser[0].id])
        }
    }

    static Register = async (req, res) => {
        const {username, email, pass} = req.body;
        const safePass = await hash(pass, 10)
        const user = {
            username, email, pass: safePass
        }
        const getAllUsers = await Users.getAll()
        
        async function isUserInUse(){
            let bool = false
            if (getAllUsers){
                getAllUsers.forEach(user => {
                    if (user.username === username){
                        bool = true
                    } else if (user.email === email){
                        bool = true
                    }
                })
                if (!bool){
                    const userRegistered = await Users.Register(user);
                    userRegistered ? res.status(200).json({'mensaje': 'Usuario registrado exitosamente'}) : res.status(500).json({'mensaje': 'Error intero del servidor'})    
                } else return res.send('El nombre de usuario o la dirección de correo ingresadas ya se encuentran en uso')
            } else {
                const userRegistered = await Users.Register(user);
                userRegistered ? res.status(200).json({'mensaje': 'Usuario registrado exitosamente'}) : res.status(500).json({'mensaje': 'Error intero del servidor'})
            }
        } 
        isUserInUse()   
    }

    static getAll = async (req, res) => {
         const users = await Users.getAll()
         users ? res.status(200).json(users) : res.status(200).send('No hay usuarios registrados.')
    }
}

module.exports = UsersController;