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
      try{
      console.log("under authentication");
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(token);
      // Send token back as a response or set it in a cookie
    res.cookie('jwtToken', token, {
        path: '/',  // Makes the cookie available site-wide
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        // httpOnly: true, 
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      });
      console.log("going inside courses");
      console.log(`${process.env.FRONTEND_APP_BASEURL}/courses`);
      // res.redirect(`${process.env.FRONTEND_APP_BASEURL}/courses`); // Redirect to the courses page
      res.status(302).location(`${process.env.FRONTEND_APP_BASEURL}/courses`).end();
      console.log("after redirecting");
    }
    catch (error) {
      console.log('Error eeee:', error.message);
    }
    }    
  );
module.exports = router;
