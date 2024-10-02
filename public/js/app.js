const express = require('express');
const app = express();

app.get('/users/search', (req, res) => {
  const name = req.query.name;
  res.send(`Hello, ${name}!`);
});

const db = require('./db');

db.query("SELECT * FROM users WHERE name LIKE '%条件%' OR email LIKE '%条件%'", (err, results) => {
    if (err) {
        console.error('Error fetching data:', err);
        return;
    }
    console.log('Data fetched:', results);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
