const mysql = require('mysql2');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Raghv12345#',
    database: "test"
});

con.connect((err) => {
    if (err)
     {
        console.error('Error in connection:', err);
    }
    else {
        console.warn("connected");
    }
});

module.exports = con;
