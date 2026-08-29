import React from 'react';
import './TaskCard.css';

function TaskCard({ task, onUpdate, onDelete }) {
  const handleStatusChange = (e) => {
    onUpdate(task.id, { status: e.target.value });
  };

  const handlePriorityChange = (e) => {
    onUpdate(task.id, { priority: e.target.value });
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>🗑️</button>
      </div>

      <div className="task-body">
        <div className="task-field">
          <label>Status</label>
          <select value={task.status} onChange={handleStatusChange} className="status-select">
            <option value="Pending">❌ Pending</option>
            <option value="In Progress">⏳ In Progress</option>
            <option value="Completed">✅ Completed</option>
          </select>
        </div>

        <div className="task-field">
          <label>Priority</label>
          <select value={task.priority} onChange={handlePriorityChange} className="priority-select">
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟡 Medium</option>
            <option value="High">🔴 High</option>
          </select>
        </div>
      </div>

      <div className="task-footer">
        <span className="task-id">ID: {task.id}</span>
        <span className="task-status-badge" style={{ 
          backgroundColor: task.status === 'Completed' ? '#27ae60' : 
                          task.status === 'In Progress' ? '#f39c12' : '#e74c3c'
        }}>
          {task.status}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;