<<<<<<< HEAD
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
=======
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
>>>>>>> 4cdfcea3e54777f268b1db00a5c08db5924a4760

const app = express();
const PORT = process.env.PORT || 3001;

<<<<<<< HEAD
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
=======
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
// const helpers = require('./utils/helpers');

const hbs = exphbs.create();

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
>>>>>>> 4cdfcea3e54777f268b1db00a5c08db5924a4760
