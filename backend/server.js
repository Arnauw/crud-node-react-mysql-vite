const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const app = express();

const port = 8081;

const database = mysql2.createConnection({
    host: 'localhost', // Adresse IP ou nom de domaine du serveur MySQL
    user: 'root', // Nom d'utilisateur pour se connecter à la base de données
    password: 'password', // Mot de passe pour se connecter à la base de données
    database: 'crudnode' // Nom de la base de données à utiliser
});


const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:8081',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:8081',
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    headers: 'Content-Type,Authorization',
    credentials: true, // allow cookies to be sent with requests
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
    // res.json("Hello to you from backend!")
    const sql = "SELECT * FROM student";
    database.query(sql, (err, data) => {
        // if (err) throw err;
        if (err) return res.json("Error while getting data.");
        return res.json(data);
    })
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (`name`, `email`) VALUES (?, ?)";
    const values = [
        req.body.name,
        req.body.email
    ];
    database.query(sql, values, (err, data) => {
        if (err) return res.json("Error while inserting data.");
        return res.json(data);
    })
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET `name` = ?, `email` = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.email
    ];
    const id = req.params.id;
    database.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error while updating data.");
        return res.json(data);
    })
});

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE id = ?";
    const id = req.params.id;
    
    database.query(sql, [id],(err, data) => {
        if (err) return res.json("Error while deleting data.");
        return res.json(data);
    })
});

// app.get('/student/:id', (req, res) => {
//     const sql = "SELECT * FROM student WHERE id = ?";
//     const id = req.params.id;
//
//     database.query(sql, [id], (err, data) => {
//         if (err) {
//             console.log('SQL Error:', err);
//             return res.status(500).json({ error: 'Error fetching student data' });
//         }
//         if (data.length > 0) {
//             return res.json(data[0]);
//         } else {
//             return res.status(404).json({ error: 'Student not found' });
//         }
//     });
// });

app.listen(port, () => {
    console.log("Server running on port " + port);
});