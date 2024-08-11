const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authenticateToken = require('../middleware/authenticateToken');

// Get all tasks for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching tasks for userId:', req.user.userId); // Debug: Log userId
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new task for the authenticated user
router.post('/', authenticateToken, async (req, res) => {
  const task = new Task({
    userId: req.user.userId, // Use req.user.userId
    title: req.body.title,
    description: req.body.description,
    deadline: req.body.deadline,
    priority: req.body.priority,
    status: req.body.status
  });

  try {
    const newTask = await task.save();
    console.log('Task saved:', newTask); // Debug: Log saved task
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task for the authenticated user
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });
    if (task) {
      task.status = req.body.status || task.status;
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.deadline = req.body.deadline || task.deadline;
      task.priority = req.body.priority || task.priority;
      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found or unauthorized' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task for the authenticated user
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (task) {
      res.json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found or unauthorized' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
