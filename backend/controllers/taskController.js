const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

exports.addTask = async (req, res) => {
    const { title, description, deadline, priority } = req.body;
    
    try {
        const task = new Task({ title, description, deadline, priority, user: req.user.id });
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Error adding task' });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    try {
        const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Error updating task' });
    }
};
