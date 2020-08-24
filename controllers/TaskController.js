// Import Model base Task
const Task = require('../models/Task');

// List all available tasks
exports.listAllTasks = (req, res) => {
  Task.find({}, (err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(task);
  });
};

// Create a new task with required validation
exports.createNewTask = (req, res) => {
  let newTask = new Task(req.body);
  newTask.save((err, task) => {
    if (err) {
      res.status(500).send({ message: 'Please fill all the fields' });
    }
    res.status(201).json(task);
  });
};

// Get or read a perticular task => By id
exports.readTask = (req, res) => {
  Task.findById(req.params.taskid, (err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(task);
  });
};

// Update a new task => By id
exports.updateTask = (req, res) => {
  Task.findOneAndUpdate(
    { _id: req.params.taskid },
    req.body,
    { new: true },
    (err, task) => {
      if (err) {
        res.status(500).send(err);
      }
      //   res.status(200).json(task);
      res.status(200).json({ message: 'Task successfully Updated' });
    }
  );
};

// Delete a perticular task => By id
exports.deleteTask = (req, body) => {
  Task.remove({ _id: req.params.taskid }, (err, task) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: 'Task successfully deleted' });
  });
};
