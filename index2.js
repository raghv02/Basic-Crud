const express = require('express');
const con = require("./config");
const app = express();
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const publicpath = path.join(__dirname, 'public');
app.use(express.static(publicpath));

app.get('/', (req, res) => {
    console.log("***");
    res.render('home');
});

app.get('/update', function (req, res) {
    con.connect(function (error) {
        if (error)
            console.log(error);
        const sql = 'SELECT * FROM users WHERE idusers=?';
        var idusers = req.query.idusers;
        con.query(sql, [idusers], function (error, result) {
            if (error)
                console.log(error);
            res.render('update', { user: result }); // Use 'update' as the view name
        });
    });
});

app.post('/update', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var age = req.body.age;
    var idusers = req.body.idusers;
    con.connect(function (error) {
        if (error) { console.log(error); }
        var sql = 'UPDATE users SET name=?, email=?, age=? WHERE idusers = ?';
        con.query(sql, [name, email, age, idusers], function (error, result) {
            if (error)
                console.log(error);
            res.redirect('/update2'); // Use 'update2' as the route URL
        });
    });
});



app.post('/xyz', (req, resp) => {
    console.log("kkkkk");
    try {
        var name = req.body.name;
        var email = req.body.email;
        var age = req.body.age;
        var sql = 'INSERT into users (name, email, age) VALUES (?, ?, ?)';
        var values = [name, email, age];

        con.query(sql, values, function (err, result) {
            if (err) {
                console.error("Error inserting data:", err);
                resp.status(500).send("An error occurred while saving the data.");
            } else {
                console.log("Data uploaded");
                resp.redirect('/home.html');
            }
        });
    } catch (error) {
        console.log("Error occurred:", error);
        resp.status(500).send("An error occurred while processing the request.");
    }
});

app.get('/read', (req, res) => {
    const sql = 'SELECT * FROM users';
    con.query(sql, (error, users) => {
        if (error) {
            console.error('Error fetching data from the database:', error);
            res.status(500).send('An error occurred while fetching data from the database.');
        } else {
            res.render('read', { users: users });
        }
    });
});
app.get('/update2', (req, res) => {
    const sql = 'SELECT * FROM users';
    con.query(sql, (error, users) => {
        if (error) {
            console.error('Error fetching data from the database:', error);
            res.status(500).send('An error occurred while fetching data from the database.');
        } else {
            res.render('update2', { users: users });
        }
    });
});

app.get('/delete', (req, res) => {
    const sql = 'SELECT * FROM users';
    con.query(sql, (error, users) => {
        if (error) {
            console.error('Error fetching data from the database:', error);
            res.status(500).send('An error occurred while fetching data from the database.');
        } else {
            res.render('delete', { users: users });
        }
    });
});

app.post('/delete', function (req, res) {
    var idusers = req.body.idusers;
    con.connect(function (error) {
        if (error) {
            console.log(error);
        }
        var sql = 'DELETE FROM users WHERE idusers = ?';
        con.query(sql, [idusers], function (error, result) {
            if (error) {
                console.log(error);
            }
            res.redirect('/delete'); // Use 'update2' as the route URL
        });
    });
});


app.listen(4000, (err) => {
    if (err) {
        console.error("Error starting the server:", err);
    } else {
        console.log('Server started on http://localhost:4000');
    }
});
