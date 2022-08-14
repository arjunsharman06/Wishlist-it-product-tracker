const router = require('express').Router();
const passport = require('passport');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/logout', (req, res) => {
  res.render('login');
});

// Google Outh
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
);

// Redirecting to dashboard
router.get('/dashboard', (req, res) => {
  res.send(`Hello`);
});

module.exports = router;
