const sequelizeDb = require("../connection/db");
const Task = require("../Models/taskModel");



// post Task
const postTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = await Task.create({ title, description });
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Read all tasks
const readTasks =  async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Read a specific task by ID
const singleTask =  async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a task by ID
const updateTask =  async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const [updatedRows] = await Task.update(req.body, {
            where: { id: taskId },
        });

        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const updatedTask = await Task.findByPk(taskId);
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a task by ID
const deleteTask =  async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const deletedRows = await Task.destroy({ where: { id: taskId } });

        if (deletedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
     postTask,
     readTasks,
     singleTask,
     updateTask,
     deleteTask,
}