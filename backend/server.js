const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: 'Learn React', status: 'Completed', priority: 'High' },
  { id: 2, title: 'Build MERN App', status: 'In Progress', priority: 'High' },
  { id: 3, title: 'Master Express.js', status: 'Pending', priority: 'Medium' },
  { id: 4, title: 'Study Node.js', status: 'Pending', priority: 'Low' }
];

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json({ success: true, data: tasks, message: 'Tasks fetched' });
});

// Get stats
app.get('/api/stats', (req, res) => {
  const stats = {
    totalTasks: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    pending: tasks.filter(t => t.status === 'Pending').length
  };
  res.json({ success: true, data: stats, message: 'Stats fetched' });
});

// Add task
app.post('/api/tasks', (req, res) => {
  const { title, status, priority } = req.body;
  if (!title) return res.status(400).json({ success: false, message: 'Title required' });
  
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title,
    status: status || 'Pending',
    priority: priority || 'Medium'
  };
  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask, message: 'Task added' });
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
  
  if (req.body.status) task.status = req.body.status;
  if (req.body.priority) task.priority = req.body.priority;
  
  res.json({ success: true, data: task, message: 'Task updated' });
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Task not found' });
  
  const deleted = tasks.splice(index, 1);
  res.json({ success: true, data: deleted[0], message: 'Task deleted' });
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Backend running' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});