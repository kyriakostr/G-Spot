const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'kyriakos2306',
        database:'g-spot',
        port:3307
    }
)




module.exports = {db}