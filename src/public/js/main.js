// DOM Elements
const taskForm = document.getElementById('task-form');
const tasksList = document.getElementById('tasks-list');
const statusFilter = document.getElementById('status-filter');
const priorityFilter = document.getElementById('priority-filter');
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-task-form');
const closeModal = document.querySelector('.close-modal');
const taskTemplate = document.getElementById('task-template');
const emptyState = document.querySelector('.empty-state');

// Tasks data
let tasks = [];

// Fetch all tasks on page load
fetchTasks();

// Event Listeners
taskForm.addEventListener('submit', handleFormSubmit);
statusFilter.addEventListener('change', filterTasks);
priorityFilter.addEventListener('change', filterTasks);
editForm.addEventListener('submit', handleEditSubmit);
closeModal.addEventListener('click', () => editModal.classList.remove('active'));
window.addEventListener('click', (e) => {
  if (e.target === editModal) {
    editModal.classList.remove('active');
  }
});

// API functions
async function fetchTasks() {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    
    tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

async function createTask(task) {
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    
    const newTask = await response.json();
    tasks.push(newTask);
    renderTasks(tasks);
    return newTask;
  } catch (error) {
    showNotification(error.message, 'error');
    return null;
  }
}

async function updateTask(id, updates) {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    
    const updatedTask = await response.json();
    tasks = tasks.map(task => task.id === id ? updatedTask : task);
    renderTasks(tasks);
    return updatedTask;
  } catch (error) {
    showNotification(error.message, 'error');
    return null;
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    
    tasks = tasks.filter(task => task.id !== id);
    renderTasks(tasks);
    showNotification('Task deleted successfully', 'success');
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

// Handler functions
function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(taskForm);
  const task = {
    title: formData.get('title'),
    description: formData.get('description'),
    priority: formData.get('priority'),
    dueDate: formData.get('dueDate') || null
  };
  
  createTask(task)
    .then(newTask => {
      if (newTask) {
        taskForm.reset();
        showNotification('Task created successfully', 'success');
      }
    });
}

function handleEditSubmit(e) {
  e.preventDefault();
  
  const id = document.getElementById('edit-task-id').value;
  const formData = new FormData(editForm);
  const updates = {
    title: formData.get('title'),
    description: formData.get('description'),
    status: formData.get('status'),
    priority: formData.get('priority'),
    dueDate: formData.get('dueDate') || null
  };
  
  updateTask(id, updates)
    .then(updatedTask => {
      if (updatedTask) {
        editModal.classList.remove('active');
        showNotification('Task updated successfully', 'success');
      }
    });
}

function handleTaskStatusChange(id, currentStatus) {
  let newStatus;
  
  switch (currentStatus) {
    case 'pending':
      newStatus = 'in-progress';
      break;
    case 'in-progress':
      newStatus = 'completed';
      break;
    case 'completed':
      newStatus = 'pending';
      break;
    default:
      newStatus = 'pending';
  }
  
  updateTask(id, { status: newStatus });
}

function handleEditClick(id) {
  const task = tasks.find(task => task.id === id);
  if (!task) return;
  
  document.getElementById('edit-task-id').value = task.id;
  document.getElementById('edit-title').value = task.title;
  document.getElementById('edit-description').value = task.description || '';
  document.getElementById('edit-status').value = task.status;
  document.getElementById('edit-priority').value = task.priority;
  
  if (task.dueDate) {
    const date = new Date(task.dueDate);
    const formattedDate = date.toISOString().split('T')[0];
    document.getElementById('edit-dueDate').value = formattedDate;
  } else {
    document.getElementById('edit-dueDate').value = '';
  }
  
  editModal.classList.add('active');
}

function handleDeleteClick(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    deleteTask(id);
  }
}

// UI functions
function renderTasks(tasksToRender) {
  // Clear tasks list except for the empty state
  const children = Array.from(tasksList.children);
  for (const child of children) {
    if (!child.classList.contains('empty-state')) {
      tasksList.removeChild(child);
    }
  }
  
  // Show or hide empty state
  if (tasksToRender.length === 0) {
    emptyState.style.display = 'block';
    return;
  } else {
    emptyState.style.display = 'none';
  }
  
  // Create and append task elements
  tasksToRender.forEach(task => {
    const taskElement = createTaskElement(task);
    tasksList.appendChild(taskElement);
  });
}

function createTaskElement(task) {
  const taskClone = document.importNode(taskTemplate.content, true);
  const taskCard = taskClone.querySelector('.task-card');
  
  taskCard.dataset.id = task.id;
  taskCard.querySelector('.task-title').textContent = task.title;
  
  const description = taskCard.querySelector('.task-description');
  description.textContent = task.description || 'No description provided';
  
  const priorityEl = taskCard.querySelector('.task-priority');
  priorityEl.textContent = `${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority`;
  priorityEl.dataset.priority = task.priority;
  
  const statusEl = taskCard.querySelector('.task-status');
  statusEl.textContent = task.status.charAt(0).toUpperCase() + task.status.slice(1);
  statusEl.dataset.status = task.status;
  
  const dueDate = taskCard.querySelector('.task-due-date');
  if (task.dueDate) {
    const date = new Date(task.dueDate);
    dueDate.textContent = `Due: ${date.toLocaleDateString()}`;
  } else {
    dueDate.textContent = 'No due date';
  }
  
  // Add event listeners to buttons
  taskCard.querySelector('.btn-status').addEventListener('click', () => {
    handleTaskStatusChange(task.id, task.status);
  });
  
  taskCard.querySelector('.btn-edit').addEventListener('click', () => {
    handleEditClick(task.id);
  });
  
  taskCard.querySelector('.btn-delete').addEventListener('click', () => {
    handleDeleteClick(task.id);
  });
  
  return taskCard;
}

function filterTasks() {
  const statusValue = statusFilter.value;
  const priorityValue = priorityFilter.value;
  
  let filteredTasks = [...tasks];
  
  // Filter by status
  if (statusValue !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.status === statusValue);
  }
  
  // Filter by priority
  if (priorityValue !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.priority === priorityValue);
  }
  
  renderTasks(filteredTasks);
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add notification to the DOM
  document.body.appendChild(notification);
  
  // Add styles dynamically
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.padding = '10px 20px';
  notification.style.borderRadius = '4px';
  notification.style.color = 'white';
  notification.style.fontSize = '14px';
  notification.style.zIndex = '1000';
  notification.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
  notification.style.transition = 'all 0.3s ease';
  notification.style.transform = 'translateY(100px)';
  notification.style.opacity = '0';
  
  // Set background color based on type
  if (type === 'success') {
    notification.style.backgroundColor = '#10B981';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#EF4444';
  } else {
    notification.style.backgroundColor = '#3B82F6';
  }
  
  // Trigger animation
  setTimeout(() => {
    notification.style.transform = 'translateY(0)';
    notification.style.opacity = '1';
  }, 10);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}