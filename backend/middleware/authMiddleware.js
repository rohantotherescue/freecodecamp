const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied, no token provided.' });
  }
  console.log(authHeader);

  // Check if the header starts with 'Bearer ' (case-sensitive)
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(400).json({ message: 'Invalid token format.' });
  }

  // Correctly extract the token after 'Bearer '
  const token = authHeader.split(' ')[1];
   
  console.log('Extracted Token:', token); // Log the extracted token for debugging

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing.' });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user information to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('JWT Error:', err.message); // Log the error message
    res.status(400).json({ message: 'Invalid token.' });
  }
};



module.exports = authMiddleware;
