const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '..', 'data');
const tasksFile = path.join(dataPath, 'tasks.json');

// In-memory database
let tasks = [];

// Ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.mkdir(dataPath, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
};

// Save tasks to file
const saveTasks = async () => {
  try {
    await ensureDataDir();
    await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

// Load tasks from file
const loadTasks = async () => {
  try {
    const data = await fs.readFile(tasksFile, 'utf8');
    tasks = JSON.parse(data);
    return tasks;
  } catch (error) {
    throw new Error('No tasks file found');
  }
};

// Get all tasks
const getTasks = () => {
  return tasks;
};

// Get a single task by ID
const getTask = (id) => {
  return tasks.find(task => task.id === id);
};

// Add a new task
const addTask = (task) => {
  const newTask = { id: uuidv4(), ...task };
  tasks.push(newTask);
  saveTasks();
  return newTask;
};

// Update a task
const updateTaskById = (id, updates) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() };
    saveTasks();
    return tasks[index];
  }
  return null;
};

// Delete a task
const deleteTaskById = (id) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasks();
    return true;
  }
  return false;
};

// Get tasks by status
const getTasksWithStatus = (status) => {
  return tasks.filter(task => task.status === status);
};

// Get tasks by priority
const getTasksWithPriority = (priority) => {
  return tasks.filter(task => task.priority === priority);
};

module.exports = {
  loadTasks,
  getTasks,
  getTask,
  addTask,
  updateTaskById,
  deleteTaskById,
  getTasksWithStatus,
  getTasksWithPriority
};