const express =  require('express');
const signUpRouter = express.Router();

//import signUp controller
const signUpController = require('../controller/signUp');

signUpRouter.post('/',signUpController.signUp); // register a new User

module.exports = signUpRouter ; 