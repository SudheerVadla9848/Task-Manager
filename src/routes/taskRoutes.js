const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

// GET all tasks
router.get('/', taskController.getAllTasks);

// GET a single task
router.get('/:id', taskController.getTaskById);

// POST create a new task
router.post('/', taskController.createTask);

// PUT update a task
router.put('/:id', taskController.updateTask);

// DELETE a task
router.delete('/:id', taskController.deleteTask);

// GET tasks filtered by status
router.get('/filter/status/:status', taskController.getTasksByStatus);

// GET tasks filtered by priority
router.get('/filter/priority/:priority', taskController.getTasksByPriority);

module.exports = router;