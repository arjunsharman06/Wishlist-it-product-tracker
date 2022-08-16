const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(passport.authenticate('session'));
const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().getFullYear().toString() +
        (new Date().getMonth() + 1).toString() +
        new Date().getDate().toString() +
        new Date().getHours().toString() +
        new Date().getMinutes().toString() +
        new Date().getSeconds().toString() +
        file.originalname.slice(-4)
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

app.post('/upload/send_file', upload.array('img', 1), (req, res, next) => {
  let file_name =
    new Date().getFullYear().toString() +
    (new Date().getMonth() + 1).toString() +
    new Date().getDate().toString() +
    new Date().getHours().toString() +
    new Date().getMinutes().toString() +
    new Date().getSeconds().toString();
  req.files[0].originalname.slice(-4);
  //res.status(201).send();
  res.redirect('/');
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./controllers/'));

// Google Outh
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/oauth2/redirect/google',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// Serializing the users
passport.serializeUser(function (user, done) {
  done(null, user);
});

// De-Serializing the users
passport.deserializeUser(function (user, done) {
  done(null, user);
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
