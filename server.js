const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret scret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};



const multer = require('multer');

const storage = multer.diskStorage({
	destination: function ( req, file , cb ) {
		cb(null, './public/images/') ;
	},
	filename : function ( req , file , cb ) {
		cb(null, 	(new Date().getFullYear()).toString()
					+(new Date().getMonth()+1).toString()
					+(new Date().getDate()).toString()
					+(new Date().getHours()).toString()
					+(new Date().getMinutes()).toString()
					+(new Date().getSeconds()).toString()
					+file.originalname.slice(-4) ) ;
	}
});
const fileFilter = ( req, file, cb ) => {

	if ( file.mimetype === "image/jpeg" 
		|| file.mimetype === "image/jpg" 
		|| file.mimetype === "image/png"
		|| file.mimetype === "image/gif"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

const upload = multer({
	storage: storage,
	fileFilter: fileFilter 
});


app.post("/upload/send_file",upload.array('img',1), (req,res,next)=>{
  let file_name= (new Date().getFullYear()).toString()
  +(new Date().getMonth()+1).toString()
  +(new Date().getDate()).toString()
  +(new Date().getHours()).toString()
  +(new Date().getMinutes()).toString()
  +(new Date().getSeconds()).toString()
  req.files[0].originalname.slice(-4);
	//res.status(201).send();
  res.redirect('/');
});


app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});