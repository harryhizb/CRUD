const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const sequelizeDb = require('./connection/db');
const taskRouter = require('./Routes/tasksRouter');
const singInRouter =  require('./Routes/signInRouter');
const signUpRouter = require('./Routes/signUpRouter');


const app = express();

// Middlewares
app.use(morgan('dev')); // Logging middleware
app.use(helmet()); // Security headers middleware
app.use(compression()); // Response compression middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true })); // Session middleware
app.use(passport.initialize()); // Passport initialization middleware
app.use(passport.session());


// Database connection route
app.get('/', (req, res) => {
    res.send('Database connected!');
});

// signUp Route
app.use('/signUp', signUpRouter);

//  sigIn Route
app.use('/singIn',singInRouter);

// Tasks Routes
app.use('/tasks', taskRouter);

module.exports = app ;