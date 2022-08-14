const userRoutes = require('./../api/user-routes');
const router = require('express').Router();

// Creating user Route
router.use('/users', userRoutes);

module.exports = router;
