const express = require('express');
const app = express();
const port = 3000; // You can use a different port if 3000 is already in use

app.use(express.static('public')); // Assuming your p5.js sketch is in a 'public' folder

app.get('/log', (req, res) => {
  console.log(req.query.message);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
