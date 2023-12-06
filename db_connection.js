require('dotenv').config();
const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    user: 'root',
    host: 'localhost',
    database: process.env.DB,
    password: process.env.PASSWORD
    }
);

connection.connect(err => {
    err ? console.log(err) : console.log('Conectado a la DB');
})

module.exports = connection;


