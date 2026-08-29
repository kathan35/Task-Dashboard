import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TaskCard from './components/TaskCard';
import StatCard from './components/StatCard';
import AddTaskForm from './components/AddTaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const tasksRes = await axios.get('/api/tasks');
      const statsRes = await axios.get('/api/stats');
      setTasks(tasksRes.data.data);
      setStats(statsRes.data.data);
      setError(null);
    } catch (err) {
      setError('Backend not running. Start backend first!');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post('/api/tasks', newTask);
      setTasks([...tasks, response.data.data]);
      setShowForm(false);
      fetchData();
    } catch (err) {
      alert('Failed to add task');
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, updates);
      setTasks(tasks.map(t => t.id === id ? response.data.data : t));
      fetchData();
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
      fetchData();
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="App">
      <header className="header">
        <h1>📋 Task Dashboard</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      {stats && (
        <div className="stats-container">
          <StatCard icon="📊" title="Total Tasks" value={stats.totalTasks} color="#3498db"/>
          <StatCard icon="✅" title="Completed" value={stats.completed} color="#27ae60"/>
          <StatCard icon="⏳" title="In Progress" value={stats.inProgress} color="#f39c12"/>
          <StatCard icon="❌" title="Pending" value={stats.pending} color="#e74c3c"/>
        </div>
      )}

      <div className="main-container">
        <div className="tasks-header">
          <h2>Your Tasks</h2>
          <button className="btn-add-task" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Cancel' : '+ Add Task'}
          </button>
        </div>

        {showForm && <AddTaskForm onAdd={handleAddTask} onCancel={() => setShowForm(false)} />}

        <div className="tasks-container">
          {tasks.length === 0 ? (
            <div className="no-tasks">
              <p>No tasks yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="tasks-grid">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>Built with React, Node.js & Express | MERN Stack</p>
      </footer>
    </div>
  );
}

export default App;