const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // Verify Authentication
  const {authorization} = req.headers;

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'});
  }

  // Token example: "Bearer asdjfhjsoidvsd.324235jhbsdkjf.sdkjbfskf"

  const token = authorization.split(' ')[1];

  try {
    const {_id} = jwt.verify(token, process.env.SECRET);

    // Find user in the database
    req.user = await User.findOne({_id}).select('_id');  // Just return _id
    next();  // Go to next handler function
  } catch (error) {
    console.log(error);
    res.status(401).json({error: 'Request is not authorized'});
  }
}

module.exports = requireAuth;
