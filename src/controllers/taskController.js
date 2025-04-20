const { 
  getTasks, 
  getTask, 
  addTask, 
  updateTaskById, 
  deleteTaskById,
  getTasksWithStatus,
  getTasksWithPriority
} = require('../models/taskModel');

// Get all tasks
exports.getAllTasks = (req, res) => {
  const tasks = getTasks();
  res.status(200).json(tasks);
};

// Get a single task by ID
exports.getTaskById = (req, res) => {
  const { id } = req.params;
  const task = getTask(id);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  res.status(200).json(task);
};

// Create a new task
exports.createTask = (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  
  const newTask = addTask({
    title,
    description: description || '',
    priority: priority || 'medium',
    status: 'pending',
    dueDate: dueDate || null,
    createdAt: new Date().toISOString()
  });
  
  res.status(201).json(newTask);
};

// Update a task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const task = getTask(id);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  const updatedTask = updateTaskById(id, req.body);
  res.status(200).json(updatedTask);
};

// Delete a task
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const task = getTask(id);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  deleteTaskById(id);
  res.status(200).json({ message: 'Task deleted successfully' });
};

// Get tasks by status
exports.getTasksByStatus = (req, res) => {
  const { status } = req.params;
  const tasks = getTasksWithStatus(status);
  res.status(200).json(tasks);
};

// Get tasks by priority
exports.getTasksByPriority = (req, res) => {
  const { priority } = req.params;
  const tasks = getTasksWithPriority(priority);
  res.status(200).json(tasks);
};