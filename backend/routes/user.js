const express = require('express');

// Controller functions
const {signinUser, signupUser} = require('../controllers/userController');

const router = express.Router();

// Sign in route
router.post('/signin', signinUser);

// Sign up route
router.post('/signup', signupUser);

module.exports = router;
