const express =  require('express');
const singInRouter = express.Router();

// importing sigIn controller
const sigInController =  require('../controller/signIn');

singInRouter.post('/',sigInController.SignIn);

module.exports = singInRouter; 