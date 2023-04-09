const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const routes = require('./routes/users');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'views')));


const db = require("./config/keys").MongoURI;
mongoose.connect(db, {useNewUrlParser: true})
        .then(() => console.log("connected to database"))
        .catch(err => console.log(err))

// Set the views directory
app.set('views', './views');

// Use EJS as the view engine
app.set('view engine', 'ejs');

// Parse incoming JSON requests
app.use(express.json());

// Parse incoming URL-encoded form data
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false
}));

// Set up routes
app.use('/', routes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
