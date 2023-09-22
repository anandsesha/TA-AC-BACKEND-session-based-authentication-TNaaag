var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* Users Home Page */
router.get('/', function (req, res, next) {
  res.render('userHomePage');
});

/* ------- Handle a GET request on `/users/register` where render the registration form ------*/
router.get('/register', async (req, res, next) => {
  res.render('registerForm');
});

/* ------- Handle a POST request on `/users/register` where we will capture the data & save it into mongoDB database ------*/
router.post('/register', async (req, res, next) => {
  var newUser = await User.create(req.body);
  console.log(newUser, `inside user.create() router`);
  res.redirect('/users/login');
});

router.get('/login', async (req, res, next) => {
  res.render('loginForm');
});

module.exports = router;
