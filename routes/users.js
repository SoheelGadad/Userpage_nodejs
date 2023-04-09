const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('Home');
});

router.get('/login', (req, res) => {
  res.render('./login/login');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if user exists in database
  User.findOne({ email })
    .then(user => {
      if (!user) {
        // If user doesn't exist, redirect back to login page with error message
        res.render('login', { error: 'Invalid email or password' });
      } else {
        // Check if password is correct
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              // If password is correct, set session cookie and redirect to dashboard
              req.session.user = user;
              res.redirect('/Home');
            } else {
              // If password is incorrect, redirect back to login page with error message
              res.render('login', { error: 'Invalid email or password' });
            }
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

router.get('/signup', (req, res) => {
  res.render('./login/login');
});

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists in database
  User.findOne({ email })
    .then(user => {
      if (user) {
        // If user already exists, redirect back to signup page with error message
        res.render('signup', { error: 'User already exists' });
      } else {
        // If user doesn't exist, create new user in database and redirect to dashboard
        bcrypt.hash(password, 10)
          .then(hash => {
            const newUser = new User({
              name,
              email,
              password: hash
            });
            newUser.save()
              .then(() => {
                req.session.user = newUser;
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
});

router.get('/dashboard', (req, res) => {
  if (req.session.user) {
    // If user is logged in, render the dashboard page with user information
    const { name, email } = req.session.user;
    res.render('./UserDeshboard/dashboard', { name, email });
  } else {
    // If user is not logged in, redirect to login page
    res.redirect('/login');
  }
});
router.get('/Home', (req, res) => {
  if (req.session.user) {
    // If user is logged in, render the dashboard page with user information
    const { name, email } = req.session.user;
    res.render('user-Home', { name, email });
  } else {
    // If user is not logged in, redirect to login page
    res.redirect('/login');
  }
});

module.exports = router;
