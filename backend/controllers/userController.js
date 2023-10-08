const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {  // _id just to keep with MongoDB's style
  return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'});  // Token expires in 3 days
}

// Sign in user
const signinUser = async(req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.signin(email, password);

    // Create token
    const token = createToken(user._id);

    res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// Sign up user
const signupUser = async(req, res) => {
  // Hash password
  const {email, password} = req.body;

  try {
    const user = await User.signup(email, password);

    // Create token
    const token = createToken(user._id);

    res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = {signinUser, signupUser};
