const express = require('express');
const app = express();

app.get('/users/search', (req, res) => {
  res.send('Search');
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
