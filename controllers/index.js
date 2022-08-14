const router = require('express').Router();
const apiRouter = require('./api/');
const homeRouter = require('./home-routes');
// var authRouter = require('./auth');

router.use('/', homeRouter);
router.use('/api', apiRouter);
// router.use('/google', authRouter);

module.exports = router;
