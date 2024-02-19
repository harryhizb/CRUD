const express = require('express');
const isLoggedIn = require('../Middlewares/loggedIn');
const taskController = require('../controller/task'); 

const taskRouter = express.Router();

// Tasks Routes
// Post Task
taskRouter.post('/postTask', isLoggedIn.isLoggedIn ,taskController.postTask);
// Get all Tasks
taskRouter.get('/getTasks', taskController.readTasks);
// Get single Task by id
taskRouter.get('/getTask/:id', taskController.singleTask); 
// Update Task by Id
taskRouter.patch('/updateTask/:id', taskController.updateTask);
// Delete Task by Id
taskRouter.delete('/deleteTask/:id', taskController.deleteTask); 

module.exports = taskRouter; 
