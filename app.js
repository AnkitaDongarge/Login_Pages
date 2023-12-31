const express = require('express');
const app = express();
const port = 3000;

const db = require('./database'); // Import the database connection

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    // Render the login form
    res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
    const name = req.body.name;
    const email=req.body.email;
    const password = req.body.password;

    // Perform a query to check the credentials
    const query = 'SELECT * FROM info WHERE name = ? AND email=? AND password = ?';

    db.query(query, [name,email, password], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Check if there is a matching user in the database
        if (results.length > 0) {
            // Successful login
            res.send('Login successful!');
        } else {
            // Invalid credentials
            res.send('Invalid username or password. Please try again.');
        }
    });
});
app.use((req, res) => {
    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    }
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
