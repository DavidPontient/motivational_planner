{"id":"90124","variant":"standard","subject":""}
/* app.js - Motivational Planner Frontend */

// Base URL for all API requests
const API_BASE = 'https://motivational-planner.onrender.com';

// Fetch and display quotes
function loadQuotes() {
  fetch(`${API_BASE}/quotes`)
    .then(response => response.json())
    .then(data => {
      const quotesContainer = document.getElementById('quotes');
      quotesContainer.innerHTML = '';
      data.forEach(quote => {
        const div = document.createElement('div');
        div.className = 'quote';
        div.textContent = `"${quote.text}" — ${quote.author}`;
        quotesContainer.appendChild(div);
      });
    })
    .catch(err => console.error('Error fetching quotes:', err));
}

// Fetch and display planner tasks
function loadPlanner() {
  fetch(`${API_BASE}/planner`)
    .then(response => response.json())
    .then(data => {
      const plannerContainer = document.getElementById('planner');
      plannerContainer.innerHTML = '';
      data.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task';
        div.textContent = `${task.time} - ${task.task}`;
        plannerContainer.appendChild(div);
      });
    })
    .catch(err => console.error('Error fetching planner tasks:', err));
}

// Add a new planner task
function addTask(event) {
  event.preventDefault();
  const taskInput = document.getElementById('taskInput');
  const timeInput = document.getElementById('timeInput');

  const newTask = {
    task: taskInput.value,
    time: timeInput.value
  };

  fetch(`${API_BASE}/planner`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Task added:', data);
      taskInput.value = '';
      timeInput.value = '';
      loadPlanner();
    })
    .catch(err => console.error('Error adding task:', err));
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  loadPlanner();

  const addForm = document.getElementById('addTaskForm');
  addForm.addEventListener('submit', addTask);
});
