const Task = require("../models/task.model");

const createNewTask = (req, res) => {
  res.send("api connected");
};

module.exports = {
  createNewTask,
};
