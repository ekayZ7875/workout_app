const jwt = require('jsonwebtoken')



const authenticatingUser = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('x-auth-token');

  // Check if token is present
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Replace 'your-secret-key' with your actual secret key

    // Attach the user from the token to the request object
    req.user = decoded.user;

    // Continue with the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid token
    console.error(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};




module.exports = {
    authenticatingUser
}