const supertest = require('supertest');
const app = require('./app');
const { response } = require('express');
const request = supertest(app);


// The test for post Api 
describe('/tasks/postTask', () => {
// if title and description is given it will show the the status code 201 
  test('should respond with status code 201 when title and description are given', async () => {
    const response = await request.post('/tasks/postTask').send({
      title: 'title',
      description: 'description',
    });
    expect(response.statusCode).toBe(201);
  });
// if no title is given it will show the status code 400  
  test('should respond with status code 400 when title is missing', async () => {
    const response = await request.post('/tasks/postTask').send({
      description: 'this is the description',
    });
    expect(response.statusCode).toBe(400);
  });
// if no description is given it will show the status code 400
  test('should respond with status code 400 when description is missing', async () => {
    const response = await request.post('/tasks/postTask').send({
      title: 'Title',
    });
    expect(response.statusCode).toBe(400);
  });
});

// The Test for the getTasks Api 
describe('/tasks/getTasks', () => {
    test('Show All records if any', async () => {
      const response = await request.get('/tasks/getTasks');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

  });

// The Test for get single task APi
describe('/tasks/getTask/:id',()=>{
    test('should return a 200 on  successfully getting Single Task', async()=>{
        const taskId = 1 ;
        const response = await request.get(`/tasks/getTask/${taskId}`);
        expect(response.statusCode).toBe(200);
    });
    test('If Task Not found',async()=>{
        const nonExistingID = 999;
        const response = await request .get(`/tasks/getTask/${nonExistingID}`);
        expect(response.statusCode).toBe(404);
    });
});

// The Test for updating a task APi
describe('/tasks/updateTask/:id',()=>{
    test('Should update existing record on Id ',async()=>{
        const taskId = 1;
        const newData = {
            title:'new Title',
            description:'new description',
        };
        const response = await request.patch(`/tasks/updateTask/${taskId}`).send(newData);
        expect(response.statusCode).toBe(200);
    });
    test('Show error if task not found',async()=>{
        const taskId = 99;
        const newData = {
            title:'new Title',
            description:'new description',
        };
        const response = await request.patch(`/tasks/updateTask/${taskId}`).send(newData);
        expect(response.statusCode).toBe(404);
    });
});

// The Test APi for Deleting
describe('/tasks/deleteTask/:id', () => {
    test('Should delete the task', async () => {
      // deleting task id 2
      const taskId = 2;
      const response = await request.delete(`/tasks/deleteTask/${taskId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: 'Task deleted successfully' });
    });
  
    test('Task Not found', async () => {
      // there is no task on 99
      const taskId = 99;
      const response = await request.delete(`/tasks/deleteTask/${taskId}`);
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Task not found' });
    });
  });