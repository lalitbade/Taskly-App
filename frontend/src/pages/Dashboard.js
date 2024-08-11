import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Header from '../components/Header';
import { FaPlus, FaTrash, FaUpload, FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', deadline: '', priority: '' });
  const [labels, setLabels] = useState([
    { name: 'Low Priority', color: '#f0ad4e' },
    { name: 'Urgent', color: '#d9534f' },
    { name: 'Work', color: '#5bc0de' },
    { name: 'Completed', color: '#5cb85c' }
  ]);
  const [searchLabel, setSearchLabel] = useState('');
  const [searchExistingLabel, setSearchExistingLabel] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Fetch tasks for the logged-in user
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!token || !user) return;

      try {
        const response = await fetch('http://localhost:5001/api/tasks', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setTasks(data.filter(task => task.userId === user._id)); 
        } else {
          console.error('Failed to fetch tasks:', data.message);
        }
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async () => {
    if (newTask.title && newTask.description && newTask.deadline && newTask.priority) {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!token || !user) return;

      try {
        const response = await fetch('http://localhost:5001/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ ...newTask, status: 'To Do', userId: user._id }) // Include user ID
        });

        const data = await response.json();

        if (response.ok) {
          setTasks([...tasks, data]);
          setNewTask({ title: '', description: '', deadline: '', priority: '' });
          setShowAddTaskForm(false);
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 2000); // Hide message after 2 seconds
        } else {
          console.error('Failed to add task:', data.message);
        }
      } catch (err) {
        console.error('Error adding task:', err);
      }
    }
  };

  // Handle task actions (progress, complete)
  const handleTaskAction = async (taskId, action) => {
    let updatedStatus;

    if (action === 'progress') {
      updatedStatus = 'On Progress';
    } else if (action === 'complete') {
      updatedStatus = 'Completed';
    }

    try {
      const response = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: updatedStatus })
      });

      if (response.ok) {
        setTasks(tasks.map(task => task._id === taskId ? { ...task, status: updatedStatus } : task));
      } else {
        const data = await response.json();
        console.error('Failed to update task:', data.message);
      }
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  // Handle label search
  const handleSearchLabel = (event) => {
    setSearchLabel(event.target.value);
  };

  const handleSearchExistingLabel = (event) => {
    setSearchExistingLabel(event.target.value);
  };

  // Filter labels
  const filteredLabels = labels.filter(label => label.name.toLowerCase().includes(searchExistingLabel.toLowerCase()));

  // Add new label
  const handleAddLabel = () => {
    if (searchLabel && !labels.some(label => label.name === searchLabel)) {
      setLabels([
        ...labels,
        { name: searchLabel, color: '#cccccc' } // Default color for new custom labels
      ]);
      setSearchLabel('');
    }
  };

  // Get label color
  const getLabelColor = (labelName) => {
    const label = labels.find(label => label.name === labelName);
    return label ? label.color : '#cccccc'; // Default color if not found
  };

  // Count tasks
  const expiredTasksCount = tasks.filter(task => new Date(task.deadline) < new Date()).length;
  const allActiveTasksCount = tasks.filter(task => task.status !== 'Completed').length;
  const completedTasksCount = tasks.filter(task => task.status === 'Completed').length;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="task-stats">
          <div className="stat-card">
            <p>Expired Tasks</p>
            <h3>{expiredTasksCount}</h3>
          </div>
          <div className="stat-card">
            <p>All Active Tasks</p>
            <h3>{allActiveTasksCount}</h3>
          </div>
          <div className="stat-card">
            <p>Completed Tasks</p>
            <h3>{completedTasksCount} / {tasks.length}</h3>
          </div>
        </div>
        <button className="add-task-btn" onClick={() => setShowAddTaskForm(!showAddTaskForm)}>
          <FaPlus /> Add Task
        </button>
      </aside>

      <main className="main-content">
        <Header />

        <div className="task-columns">
          {['To Do', 'On Progress', 'Completed'].map((status) => (
            <div key={status} className="task-column">
              <div className="column-header">
                <h2>{status}</h2>
                <span>{tasks.filter(task => task.status === status).length}</span>
              </div>
              <div className="task-list">
                {tasks.filter(task => task.status === status).map((task) => (
                  <div key={task._id} className="task-card">
                    {status === 'To Do' && (
                      <div className="menu-icons">
                        <FaUpload onClick={() => handleTaskAction(task._id, 'progress')} />
                        <FaTrash onClick={() => handleTaskAction(task._id, 'complete')} />
                      </div>
                    )}
                    {status === 'On Progress' && (
                      <div className="menu-icons">
                        <FaTrash onClick={() => handleTaskAction(task._id, 'complete')} />
                      </div>
                    )}
                    <div
                      className="task-label"
                      style={{ backgroundColor: getLabelColor(task.priority) }}
                    >
                      {task.priority}
                    </div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <div className="task-footer">
                      <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {showSuccessMessage && (
        <div className="success-message">
          <FaCheck /> Task successfully added!
        </div>
      )}

      {showAddTaskForm && (
        <div className="label-add-modal">
          <div className="form-content">
            <button className="close-form" onClick={() => setShowAddTaskForm(false)}><IoMdClose /></button>
            <h3>Add New Task</h3>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            />
            <div className="label-options">
              <div className="label-dropdown">
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                >
                  <option value="" disabled>Select Label</option>
                  {filteredLabels.map(label => (
                    <option key={label.name} value={label.name}>{label.name}</option>
                  ))}
                </select>
              </div>
              <div className="add-label-container">
                <input
                  type="text"
                  placeholder="Create new label"
                  value={searchLabel}
                  onChange={handleSearchLabel}
                />
                <button className="btn-add-label" onClick={handleAddLabel}>Add Label</button>
              </div>
            </div>
            <button className="btn-submit" onClick={handleAddTask}>Add Task</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
