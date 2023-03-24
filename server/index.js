require('dotenv').config();
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const controller = require('./controllers/');

app.use(express.json());
app.use(cookieParser());
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false
}));
app.use(function (req, res, next) {
  // console.log('path', req.path);
  if (req.session.userid == null && req.path !== '/signin' && req.path !== '/status') {
    // console.log('no session');
    //res.redirect('http://localhost:3000/');
    next();
  } else {
    // console.log('logged in');
    next();
  }
});
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(routes);
// app.use(express.static(path.join(__dirname, '/../client/dist/index.html')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Front End App listening on http://localhost:${port}`)
});

//&& req.path !== '/symbolLookup', req.path !== '/getStockQoute'