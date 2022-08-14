const router = require('express').Router();
<<<<<<< HEAD
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;
=======
const apiRouter = require('./api/');
const homeRouter = require('./home-routes');
// var authRouter = require('./auth');

router.use('/', homeRouter);
router.use('/api', apiRouter);
// router.use('/google', authRouter);

module.exports = router;
>>>>>>> 4cdfcea3e54777f268b1db00a5c08db5924a4760
