const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/auth/google/callback',
    passport.authenticate('google', { 
        failureRedirect: `${process.env.FRONTEND_APP_BASEURL}/sign-in`, 
        session: false }),
    (req, res) => {
      // Successful authentication, generate a token
      console.log("under authentication");
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send token back as a response or set it in a cookie
    res.cookie('jwtToken', token, {
        path: '/',  // Makes the cookie available site-wide
        // secure: false,
        sameSite: 'Lax',
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      });
      res.redirect(`${process.env.FRONTEND_APP_BASEURL}/courses`); // Redirect to the courses page
    }    
  );
module.exports = router;
