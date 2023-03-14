require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const controller = require('./controllers/');

app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(routes);

app.listen(port, () => {
  console.log(`Front End App listening on http://localhost:${port}`)
});