const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express()
const PORT = process.env.PORT || 8080;
const cors = require('cors');
// Route requires
const user = require('./routes/user')
const path = require('path')

// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('build'))


// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('build'));
//   }

app.use('/static', express.static(path.join(__dirname, 'build//static')));


app.get('/', (request, response) => {
	response.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/SignUp', (request, response) => {
	response.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/members', (request, response) => {
	response.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/about', (request, response) => {
	response.sendFile(path.join(__dirname, '../build', 'index.html'));
});


// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)




// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
app.use('/user', user)

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
