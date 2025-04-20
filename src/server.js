const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const taskRoutes = require('./routes/taskRoutes');
const { loadTasks } = require('./models/taskModel');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Load tasks from file if exists
(async () => {
  try {
    await loadTasks();
    console.log('Tasks loaded successfully');
  } catch (err) {
    console.log('No existing tasks found, starting with empty task list');
  }
})();

// Routes
app.use('/api/tasks', taskRoutes);

// Main route
app.get('/', (req, res) => {
  res.render('index');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});